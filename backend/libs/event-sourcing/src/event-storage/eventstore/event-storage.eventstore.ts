import { EventStorage } from '../../api/event-storage';
import * as moment from 'moment';
import { HttpService } from '@nestjs/common';
import { EventStreamVersion } from '../../api/event-stream-version.valueobject';
import { StorageEventEntry } from '../../api/storage-event-entry';
import { Time } from '../../time.type';
import { catchError, flatMap, map } from 'rxjs/operators';
import { EventStreamId } from '@coders-board-library/event-sourcing/api/event-stream-id.valueboject';
import { axiosLoggingInterceptor } from '@coders-board-library/axios-utils';
import { of, throwError } from 'rxjs';
import { AxiosResponse } from 'axios';

const EXPECTED_ANY_VERSION = -2;
const EXPECTED_STREAM_NOT_EXISTS = -1;
const EXPECTED_STREAM_IS_EMPTY = 0;

const POOL_EVERY_N_SECONDS_IF_ATOM_FEED_IS_EMPTY = 15;

export class EventStoreEventStorage implements EventStorage {
  constructor(
    private readonly time: Time,
    private readonly httpService: HttpService,
  ) {
    const loggingInterceptor = axiosLoggingInterceptor(
      reqRes => console.log(reqRes),
      false,
      true,
    );
    this.httpService.axiosRef.interceptors.response.use(
      loggingInterceptor.onFulfilled,
      loggingInterceptor.onRejected,
    );
  }

  async store(
    eventStreamId: EventStreamId,
    event: StorageEventEntry,
    expectedVersion: EventStreamVersion | undefined = undefined,
  ): Promise<any> {
    const storageEventDto = EventStoreEventStorage.toStorageEventDto(event);
    return this.storeEventsInEventStore(
      expectedVersion,
      [storageEventDto],
      eventStreamId,
    );
  }

  private static toStorageEventDto(event: StorageEventEntry) {
    const storageEventDto: StorageEventDto = {
      eventId: event.eventId,
      eventType: event.eventType,
      data: event.data,
      metadata: {
        aggregateId: event.streamId,
        occurredAt: event.occurredAt
      },
    };
    return storageEventDto;
  }

  private storeEventsInEventStore(
    expectedVersion: EventStreamVersion,
    eventsToStore: StorageEventDto[],
    eventStreamId: EventStreamId,
  ) {
    const expectedStreamVersion = EventStoreEventStorage.expectedStoredStreamVersion(
      expectedVersion,
    );
    const newStreamVersion = EventStoreEventStorage.newStreamVersion(
      expectedStreamVersion,
      eventsToStore.length,
    );
    EventStoreEventStorage.logStoredDomainEvents(
      eventStreamId,
      eventsToStore,
      expectedStreamVersion,
      newStreamVersion,
    );
    return this.httpService
      .post(`/streams/${eventStreamId.raw}`, eventsToStore, {
        headers: {
          'ES-CurrentVersion': newStreamVersion,
          'ES-ExpectedVersion': expectedStreamVersion,
          'Content-Type': 'application/vnd.eventstore.events+json',
        },
      })
      .toPromise();
  }

  private static expectedStoredStreamVersion(
    expectedVersion: EventStreamVersion,
  ) {
    return expectedVersion === undefined
      ? EXPECTED_ANY_VERSION
      : expectedVersion.isNew()
      ? EXPECTED_STREAM_NOT_EXISTS
      : expectedVersion.raw - 1;
  }

  private static newStreamVersion(
    expectedStreamVersion: number,
    eventsNumber: number,
  ) {
    return expectedStreamVersion === EXPECTED_ANY_VERSION
      ? null
      : expectedStreamVersion == EXPECTED_STREAM_NOT_EXISTS
      ? 0
      : expectedStreamVersion + eventsNumber;
  }

  private static logStoredDomainEvents(
    eventStreamId: EventStreamId,
    eventsToStore: StorageEventDto[],
    expectedStreamVersion: number,
    newStreamVersion: number,
  ) {
    if (!eventStreamId.streamGroup.includes('PUBLIC')) {
      console.log('DOMAIN EVENT PUBLISHED TO EVENT STORE');
      console.table(
        eventsToStore.map(storageEventDto => {
          return {
            eventStreamId: eventStreamId.raw,
            eventType: storageEventDto.eventType,
            expectedStreamVersion,
            newStreamVersion,
          };
        }),
      );
    }
  }

  storeAll(
    eventStreamId: EventStreamId,
    events: StorageEventEntry[],
    expectedVersion: EventStreamVersion | undefined = undefined,
  ): Promise<void> {
    const eventsInGivenStream = events.filter(
      event => event.streamId === eventStreamId.streamId,
    );
    const eventsToStore = eventsInGivenStream.map(e =>
      EventStoreEventStorage.toStorageEventDto(e),
    );
    return this.storeEventsInEventStore(
      expectedVersion,
      eventsToStore,
      eventStreamId,
    ).then();
  }

  readEvents(eventStreamId: EventStreamId, toDate?: Date) {
    const maxEventDate = toDate ? toDate : this.time();
    return this.getEventsBy(eventStreamId).then(events =>
      events.filter(it =>
        moment(it.occurredAt).isSameOrBefore(moment(maxEventDate)),
      ),
    );
  }

  private getEventsBy(
    eventStreamId: EventStreamId,
  ): Promise<StorageEventEntry[]> {
    return this.httpService
      .get(`/streams/${eventStreamId.raw}?embed=body`, {
        headers: {
          Accept: 'application/vnd.eventstore.atom+json',
          'ES-LongPool': POOL_EVERY_N_SECONDS_IF_ATOM_FEED_IS_EMPTY,
        },
      })
      .pipe(
        flatMap(response =>
          response.status == 200
            ? of(this.readEventsFromAtomFeed(response))
            : throwError(response),
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
      return {
        eventId: it.eventId,
        eventType: it.eventType,
        occurredAt: new Date(it.updated),
        streamId: EventStreamId.fromRaw(it.streamId).streamId,
        streamGroup: EventStreamId.fromRaw(it.streamId).streamGroup,
        data: JSON.parse(it.data),
      };
    });
  }
}
