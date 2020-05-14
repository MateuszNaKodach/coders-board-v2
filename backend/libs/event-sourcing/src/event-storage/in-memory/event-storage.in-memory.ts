import { EventStorage } from '../../api/event-storage';
import * as moment from 'moment';
import { EventStreamVersion } from '../../api/event-stream-version.valueobject';
import { StorageEventEntry } from '../../api/storage-event-entry';
import { Time } from '../../time.type';
import { EventStreamName } from '@coders-board-library/event-sourcing/api/event-stream-name.valueboject';

export class InMemoryEventStorage implements EventStorage {
  private eventStreams: { [key: string]: StorageEventEntry[] } = {};

  constructor(private readonly time: Time) {}

  store(
    eventStreamName: EventStreamName,
    event: StorageEventEntry,
    expectedVersion: EventStreamVersion | undefined = undefined,
  ): Promise<void> {
    const foundStream = this.eventStreams[eventStreamName.raw];
    if (foundStream && foundStream.find(e => e.eventId === event.eventId)) {
      return Promise.reject(`Event stream already contains this event with id ${event.eventId}!`);
    }
    const aggregateEvents = !foundStream ? 0 : foundStream.length;
    if (!foundStream) {
      if (expectedVersion && expectedVersion.raw !== 0) {
        return Promise.reject(`Event stream for aggregate was modified concurrently!`);
      }
      this.eventStreams[eventStreamName.raw] = [event];
    } else {
      if (expectedVersion && expectedVersion.raw !== aggregateEvents) {
        return Promise.reject(`Event stream for aggregate was modified concurrently!`);
      }
      this.eventStreams[eventStreamName.raw].push(event);
    }
    return Promise.resolve();
  }

  storeAll(
    eventStreamName: EventStreamName,
    events: StorageEventEntry[],
    expectedVersion: EventStreamVersion | undefined = undefined,
  ): Promise<void> {
    return Promise.all(
      events
        .filter(event => event.streamId === eventStreamName.streamId)
        .map((value, index) =>
          this.store(
            eventStreamName,
            value,
            expectedVersion ? EventStreamVersion.exactly(expectedVersion.raw + index) : expectedVersion,
          ),
        ),
    ).then();
  }

  readEvents(eventStreamName: EventStreamName, toDate?: Date) {
    const maxEventDate = toDate ? toDate : this.time();
    const events = this.getEventsBy(eventStreamName).filter(it =>
      moment(it.occurredAt).isSameOrBefore(moment(maxEventDate)),
    );
    return Promise.resolve(events);
  }

  private getEventsBy(eventStreamName: EventStreamName): StorageEventEntry[] {
    return this.eventStreams[eventStreamName.raw] || [];
  }
}
