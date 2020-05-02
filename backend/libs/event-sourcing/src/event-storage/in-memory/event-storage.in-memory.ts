import { EventStorage } from '../../api/event-storage';
import * as moment from 'moment';
import { Injectable } from '@nestjs/common';
import { EventStreamVersion } from '../../api/event-stream-version.valueobject';
import { StorageEventEntry } from '../../api/storage-event-entry';
import { Time } from '../../time.type';
import { EventStreamId } from '@coders-board-library/event-sourcing/api/event-stream-id.valueboject';

@Injectable()
export class InMemoryEventStorage implements EventStorage {
  private eventStreams: { [key: string]: StorageEventEntry[] } = {};

  constructor(private readonly time: Time) {}

  store(
    streamId: EventStreamId,
    event: StorageEventEntry,
    expectedVersion: EventStreamVersion | undefined = undefined,
  ): Promise<void> {
    const foundStream = this.eventStreams[streamId.raw];
    if (foundStream && foundStream.find(e => e.eventId === event.eventId)) {
      return Promise.reject(
        `Event stream already contains this event with id ${event.eventId}!`,
      );
    }
    const aggregateEvents = !foundStream ? 0 : foundStream.length;
    if (!foundStream) {
      if (expectedVersion && expectedVersion.raw !== 0) {
        return Promise.reject(
          `Event stream for aggregate was modified! Expected version: ${expectedVersion.raw}, but actual is: ${aggregateEvents}`,
        );
      }
      this.eventStreams[streamId.raw] = [event];
    } else {
      if (expectedVersion && expectedVersion.raw !== aggregateEvents) {
        return Promise.reject(
          `Event stream for aggregate was modified! Expected version: ${expectedVersion.raw}, but actual is: ${aggregateEvents}`,
        );
      }
      this.eventStreams[streamId.raw].push(event);
    }
    return Promise.resolve();
  }

  storeAll(
    streamId: EventStreamId,
    events: StorageEventEntry[],
    expectedVersion: EventStreamVersion | undefined = undefined,
  ): Promise<void> {
    return Promise.all(
      events
        .filter(event => event.aggregateId === streamId.aggregateId)
        .map((value, index) =>
          this.store(
            streamId,
            value,
            expectedVersion
              ? EventStreamVersion.exactly(expectedVersion.raw + index)
              : expectedVersion,
          ),
        ),
    ).then();
  }

  readEvents(streamId: EventStreamId, toDate?: Date) {
    const maxEventDate = toDate ? toDate : this.time();
    const events = this.getEventsBy(streamId).filter(it =>
      moment(it.occurredAt).isSameOrBefore(moment(maxEventDate)),
    );
    return Promise.resolve(events);
  }

  private getEventsBy(streamId: EventStreamId): StorageEventEntry[] {
    return this.eventStreams[streamId.raw] || [];
  }
}
