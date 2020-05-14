import { EventStorage } from '../../api/event-storage';
import * as moment from 'moment';
import { EventStreamVersion } from '../../api/event-stream-version.valueobject';
import { StorageEventEntry } from '../../api/storage-event-entry';
import { Time } from '../../time.type';
import { EventStreamId } from '@coders-board-library/event-sourcing/api/event-stream-id.valueboject';

export class InMemoryEventStorage implements EventStorage {
  private eventStreams: { [key: string]: StorageEventEntry[] } = {};

  constructor(private readonly time: Time) {}

  store(
    eventStreamId: EventStreamId,
    event: StorageEventEntry,
    expectedVersion: EventStreamVersion | undefined = undefined,
  ): Promise<void> {
    const foundStream = this.eventStreams[eventStreamId.raw];
    if (foundStream && foundStream.find(e => e.eventId === event.eventId)) {
      return Promise.reject(`Event stream already contains this event with id ${event.eventId}!`);
    }
    const aggregateEvents = !foundStream ? 0 : foundStream.length;
    if (!foundStream) {
      if (expectedVersion && expectedVersion.raw !== 0) {
        return Promise.reject(
          `Event stream for aggregate was modified! Expected version: ${expectedVersion.raw}, but actual is: ${aggregateEvents}`,
        );
      }
      this.eventStreams[eventStreamId.raw] = [event];
    } else {
      if (expectedVersion && expectedVersion.raw !== aggregateEvents) {
        return Promise.reject(
          `Event stream for aggregate was modified! Expected version: ${expectedVersion.raw}, but actual is: ${aggregateEvents}`,
        );
      }
      this.eventStreams[eventStreamId.raw].push(event);
    }
    return Promise.resolve();
  }

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
            expectedVersion ? EventStreamVersion.exactly(expectedVersion.raw + index) : expectedVersion,
          ),
        ),
    ).then();
  }

  readEvents(eventStreamId: EventStreamId, toDate?: Date) {
    const maxEventDate = toDate ? toDate : this.time();
    const events = this.getEventsBy(eventStreamId).filter(it =>
      moment(it.occurredAt).isSameOrBefore(moment(maxEventDate)),
    );
    return Promise.resolve(events);
  }

  private getEventsBy(eventStreamId: EventStreamId): StorageEventEntry[] {
    return this.eventStreams[eventStreamId.raw] || [];
  }
}
