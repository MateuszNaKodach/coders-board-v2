import {StorageEventEntry} from "@coders-board-library/event-sourcing/api/storage-event-entry";
import {EventStreamName} from "@coders-board-library/event-sourcing/api/event-stream-name.valueboject";
import {EventStreamVersion} from "@coders-board-library/event-sourcing/api/event-stream-version.valueobject";
import * as moment from "moment";

export class InMemoryEventStreamsManager {

  constructor(private readonly eventStreams: { [key: string]: StorageEventEntry[] }) {
  }

  appendEventToStream(eventStreamName: EventStreamName, event: StorageEventEntry, expectedVersion: EventStreamVersion): Promise<void> {
    const foundStream = this.eventStreams[eventStreamName.raw];
    if (foundStream && foundStream.find(e => e.eventId === event.eventId)) {
      return Promise.reject(new Error(`Event stream already contains this event with id ${event.eventId}!`));
    }
    const aggregateEvents = !foundStream ? 0 : foundStream.length;
    if (!foundStream) {
      if (expectedVersion && expectedVersion.raw !== 0) {
        return Promise.reject(new Error(`Event stream for aggregate was modified concurrently!`));
      }
      this.eventStreams[eventStreamName.raw] = [event];
    } else {
      if (expectedVersion && expectedVersion.raw !== aggregateEvents) {
        return Promise.reject(new Error(`Event stream for aggregate was modified concurrently!`));
      }
      this.eventStreams[eventStreamName.raw].push(event);
    }
    return Promise.resolve();
  }

  readEventsFromStream(eventStreamName: EventStreamName, toDate: Date): Promise<StorageEventEntry[]> {
    const events = this.getEventsBy(eventStreamName).filter(it =>
        moment(it.occurredAt).isSameOrBefore(moment(toDate)),
    );
    return Promise.resolve(events);
  }

  private getEventsBy(eventStreamName: EventStreamName): StorageEventEntry[] {
    return this.eventStreams[eventStreamName.raw] || [];
  }
}