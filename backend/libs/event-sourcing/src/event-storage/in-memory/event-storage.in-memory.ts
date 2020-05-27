import {EventStorage} from '../../api/event-storage';
import {EventStreamVersion} from '../../api/event-stream-version.valueobject';
import {StorageEventEntry} from '../../api/storage-event-entry';
import {Time} from '../../time.type';
import {EventStreamName} from '@coders-board-library/event-sourcing/api/event-stream-name.valueboject';
import {InMemoryEventStreamsManager} from "@coders-board-library/event-sourcing/event-storage/in-memory/in-memory-event-streams-manager";

export class InMemoryEventStorage implements EventStorage {
  private readonly eventStreams: { [key: string]: StorageEventEntry[] } = {};
  private readonly eventStreamsManager: InMemoryEventStreamsManager;

  constructor(private readonly time: Time) {
    this.eventStreamsManager = new InMemoryEventStreamsManager(this.eventStreams)
  }

  store(
      eventStreamName: EventStreamName,
      event: StorageEventEntry,
      expectedVersion: EventStreamVersion | undefined = undefined,
  ): Promise<void> {
    return this.eventStreamsManager.appendEventToStream(eventStreamName, event, expectedVersion);
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

  readEvents(eventStreamName: EventStreamName, toDate?: Date): Promise<StorageEventEntry[]> {
    return this.eventStreamsManager.readEventsFromStream(eventStreamName, toDate || this.time());
  }
}
