import { EventStorage } from '../../api/event-storage';
import * as moment from 'moment';
import { HttpService } from '@nestjs/common';
import { EventStreamVersion } from '../../api/event-stream-version.valueobject';
import { StorageEventEntry } from '../../api/storage-event-entry';
import { Time } from '../../time.type';
import { catchError, flatMap, retryWhen } from 'rxjs/operators';
import { EventStreamName } from '@coders-board-library/event-sourcing/api/event-stream-name.valueboject';
import { axiosLoggingInterceptor } from '@coders-board-library/axios-utils';
import { Observable, of, throwError } from 'rxjs';
import { AxiosResponse } from 'axios';
import '../../common/extension-method/error';
import { errorCausedBy } from '@coders-board-library/event-sourcing/common/extension-method/error';
import { genericRetryStrategy } from '@coders-board-library/rxjs-utils';

const EXPECTED_ANY_VERSION = -2;
const EXPECTED_STREAM_NOT_EXISTS = -1;
const EXPECTED_STREAM_IS_EMPTY = 0;

const POOL_EVERY_N_SECONDS_IF_ATOM_FEED_IS_EMPTY = 30;

export class EventStoreEventStorage implements EventStorage {
  constructor(private readonly time: Time, private readonly httpService: HttpService) {
    const loggingInterceptor = axiosLoggingInterceptor(reqRes => console.log(reqRes), false, false);
    this.httpService.axiosRef.interceptors.response.use(loggingInterceptor.onFulfilled, loggingInterceptor.onRejected);
  }

  async store(
    eventStreamName: EventStreamName,
    event: StorageEventEntry,
    expectedVersion: EventStreamVersion | undefined = EventStreamVersion.newStream(),
  ): Promise<any> {
    const storageEventDto = EventStoreEventStorage.toStorageEventDto(event);
    return this.storeEventsInEventStore(expectedVersion, [storageEventDto], eventStreamName).toPromise();
  }

  private static toStorageEventDto(event: StorageEventEntry) {
    const storageEventDto: StorageEventDto = {
      eventId: event.eventId,
      eventType: event.eventType,
      data: event.data,
      metadata: {
        aggregateId: event.streamId,
        occurredAt: event.occurredAt,
      },
    };
    return storageEventDto;
  }

  private storeEventsInEventStore(
    expectedVersion: EventStreamVersion,
    eventsToStore: StorageEventDto[],
    eventStreamName: EventStreamName,
  ): Observable<any[] | AxiosResponse<any>> {
    const expectedStreamVersion = EventStoreEventStorage.expectedStoredStreamVersion(expectedVersion);
    const newStreamVersion = EventStoreEventStorage.newStreamVersion(expectedStreamVersion, eventsToStore.length);
    EventStoreEventStorage.logStoredDomainEvents(
      eventStreamName,
      eventsToStore,
      expectedStreamVersion,
      newStreamVersion,
    );
    const defaultHeaders = {
      'ES-ExpectedVersion': expectedStreamVersion,
      'Content-Type': 'application/vnd.eventstore.events+json',
    };
    const headers = newStreamVersion
      ? {
          'ES-CurrentVersion': newStreamVersion,
          ...defaultHeaders,
        }
      : defaultHeaders;
    return this.httpService
      .post(`/streams/${eventStreamName.raw}`, eventsToStore, {
        headers,
      })
      .pipe(
        flatMap(response => (response.status == 201 ? of(response) : throwError(response))),
        retryWhen(
          genericRetryStrategy({
            maxRetryAttempts: 3,
            delayTime: 500,
            ignoredErrorCodes: [500],
          }),
        ),
        catchError(err => {
          const eventStreamModifiedConcurrent =
            err.response.status === 400 && err.response.statusText === 'Wrong expected EventNumber';
          return eventStreamModifiedConcurrent
            ? throwError(errorCausedBy(new Error('Event stream for aggregate was modified concurrently!'), err))
            : throwError(err);
        }),
      );
  }

  private static expectedStoredStreamVersion(expectedVersion: EventStreamVersion) {
    return expectedVersion === undefined
      ? EXPECTED_ANY_VERSION
      : expectedVersion.isNew()
      ? EXPECTED_STREAM_NOT_EXISTS
      : expectedVersion.raw - 1;
  }

  private static newStreamVersion(expectedStreamVersion: number, eventsNumber: number) {
    return expectedStreamVersion === EXPECTED_ANY_VERSION
      ? undefined
      : expectedStreamVersion == EXPECTED_STREAM_NOT_EXISTS
      ? 0
      : expectedStreamVersion + eventsNumber;
  }

  private static logStoredDomainEvents(
    eventStreamName: EventStreamName,
    eventsToStore: StorageEventDto[],
    expectedStreamVersion: number,
    newStreamVersion: number,
  ) {
    if (!eventStreamName.streamGroup.includes('PUBLIC')) {
      console.log('DOMAIN EVENT PUBLISHED TO EVENT STORE');
      console.table(
        eventsToStore.map(storageEventDto => {
          return {
            eventStreamName: eventStreamName.raw,
            eventType: storageEventDto.eventType,
            expectedStreamVersion,
            newStreamVersion,
          };
        }),
      );
    }
  }

  storeAll(
    eventStreamName: EventStreamName,
    events: StorageEventEntry[],
    expectedVersion: EventStreamVersion | undefined = undefined,
  ): Promise<void> {
    const eventsInGivenStream = events.filter(event => event.streamId === eventStreamName.streamId);
    const eventsToStore = eventsInGivenStream.map(e => EventStoreEventStorage.toStorageEventDto(e));
    return this.storeEventsInEventStore(expectedVersion, eventsToStore, eventStreamName).toPromise().then();
  }

  readEvents(eventStreamName: EventStreamName, toDate?: Date) {
    const maxEventDate = toDate ? toDate : this.time();
    return this.getEventsBy(eventStreamName).then(events =>
      events
        .filter(it => moment(it.occurredAt).utc().isSameOrBefore(moment(maxEventDate).utc()))
        .sort((e1, e2) => moment(e1.occurredAt).valueOf() - moment(e2.occurredAt).valueOf()),
    );
  }

  private getEventsBy(eventStreamName: EventStreamName): Promise<StorageEventEntry[]> {
    return this.httpService
      .get(`/streams/${eventStreamName.raw}?embed=body`, {
        headers: {
          Accept: 'application/vnd.eventstore.atom+json',
          'ES-LongPool': POOL_EVERY_N_SECONDS_IF_ATOM_FEED_IS_EMPTY,
        },
      })
      .pipe(
        flatMap(response =>
          response.status == 200 ? of(this.readEventsFromAtomFeed(response)) : throwError(response),
        ),
        catchError(err => {
          const eventStreamNotExists = err.response.status === 404;
          return eventStreamNotExists ? of([]) : throwError(err);
        }),
      )
      .toPromise();
  }

  private readEventsFromAtomFeed(response: AxiosResponse) {
    return response.data.entries.map(it => {
      const metadata = JSON.parse(it.metaData);
      return {
        eventId: it.eventId,
        eventType: it.eventType,
        occurredAt: metadata.occurredAt ? new Date(metadata.occurredAt) : new Date(it.updated),
        streamId: EventStreamName.fromRaw(it.streamId).streamId,
        streamGroup: EventStreamName.fromRaw(it.streamId).streamGroup,
        data: JSON.parse(it.data),
      };
    });
  }
}
