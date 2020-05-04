import { EventStorage } from '../../api/event-storage';
import * as moment from 'moment';
import { HttpService } from '@nestjs/common';
import { EventStreamVersion } from '../../api/event-stream-version.valueobject';
import { StorageEventEntry } from '../../api/storage-event-entry';
import { Time } from '../../time.type';
import { map } from 'rxjs/operators';
import { EventStreamId } from '@coders-board-library/event-sourcing/api/event-stream-id.valueboject';
import {axiosLoggingInterceptor} from "@coders-board-library/axios-utils";

const EXPECTED_ANY_VERSION = -2;
const EXPECTED_STREAM_NOT_EXISTS = -1;
const EXPECTED_STREAM_IS_EMPTY = 0;

export class EventStoreEventStorage implements EventStorage {
  constructor(
    private readonly time: Time,
    private readonly httpService: HttpService,
  ) {
    const loggingInterceptor = axiosLoggingInterceptor(reqRes => console.log(reqRes), false, true);
    this.httpService.axiosRef.interceptors.response.use(loggingInterceptor.onRejected, loggingInterceptor.onFulfilled);
  }

  store(
    eventStreamId: EventStreamId,
    event: StorageEventEntry,
    expectedVersion: EventStreamVersion | undefined = undefined,
  ): Promise<any> {
    const storageEventDto: StorageEventDto = {
      eventId: event.eventId,
      eventType: event.eventType,
      data: event.data,
      metadata: {},
    };
    return this.httpService
      .post(`/streams/${eventStreamId.raw}`, [storageEventDto], {
        headers: {
          Accept: 'application/vnd.eventstore.atom+json',
          'Content-Type': 'application/vnd.eventstore.atom+json',
          'ES-EventType': storageEventDto.eventType,
          'ES-EventId': storageEventDto.eventId,
          //'ES-ExpectedVersion': !expectedVersion ? EXPECTED_ANY_VERSION : (expectedVersion.isNew() ? EXPECTED_STREAM_NOT_EXISTS : expectedVersion.raw), TODO: Investigate how corresponds with ES-CurrentVersion
        },
      })
      .toPromise();
  }

  //TODO: Change to 1 API CALL
  storeAll(
    eventStreamId: EventStreamId,
    events: StorageEventEntry[],
    expectedVersion: EventStreamVersion | undefined = undefined,
  ): Promise<void> {
    return Promise.all(
      events
        .filter(event => event.streamId === eventStreamId.streamId)
        .map((value, index) =>
          this.store(
            eventStreamId,
            value,
            expectedVersion
              ? EventStreamVersion.exactly(expectedVersion.raw + index)
              : expectedVersion,
          ),
        ),
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
          'ES-LongPool': 15
        },
      })
      .pipe(
        map(response =>
          response.data.entries.map(it => {
            return {
              eventId: it.eventId,
              eventType: it.eventType,
              occurredAt: new Date(it.updated),
              streamId: EventStreamId.fromRaw(it.streamId).streamId,
              streamGroup: EventStreamId.fromRaw(it.streamId).streamGroup,
              data: JSON.parse(it.data),
            };
          }),
        ),
      )
      .toPromise();
  }
}
