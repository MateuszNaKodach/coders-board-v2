import { EventStorage } from '../event-storage';
import * as moment from 'moment';
import { Injectable } from '@nestjs/common';
import { EventStreamVersion } from '../../api/event-stream-version.valueobject';
import { StorageEventEntry } from '../../api/storage-event-entry';
import { Time } from '../../time.type';

@Injectable()
export class InMemoryEventStorage implements EventStorage {
  private eventStreams: { [key: string]: StorageEventEntry[] } = {};

  constructor(private readonly time: Time) {}

  store(
    event: StorageEventEntry,
    expectedVersion: EventStreamVersion | undefined = undefined,
  ): Promise<void> {
    const foundStream = this.eventStreams[event.aggregateId];
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
      this.eventStreams[event.aggregateId] = [event];
    } else {
      if (expectedVersion && expectedVersion.raw !== aggregateEvents) {
        return Promise.reject(
          `Event stream for aggregate was modified! Expected version: ${expectedVersion.raw}, but actual is: ${aggregateEvents}`,
        );
      }
      this.eventStreams[event.aggregateId].push(event);
    }
    return Promise.resolve();
  }

  storeAll(
    events: StorageEventEntry[],
    expectedVersion: EventStreamVersion | undefined = undefined,
  ): Promise<void> {
    return Promise.all(
      events.map((value, index) =>
        this.store(
          value,
          expectedVersion
            ? EventStreamVersion.exactly(expectedVersion.raw + index)
            : expectedVersion,
        ),
      ),
    ).then();
  }

  readEvents(aggregateId: string, toDate?: Date) {
    const maxEventDate = toDate ? toDate : this.time();
    const events = this.getEventsBy(aggregateId).filter(it =>
      moment(it.occurredAt).isSameOrBefore(moment(maxEventDate)),
    );
    return Promise.resolve(events);
  }

  private getEventsBy(aggregateId: string): StorageEventEntry[] {
    return this.eventStreams[aggregateId] || [];
  }
}
