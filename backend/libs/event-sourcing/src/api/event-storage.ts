import { EventStreamVersion } from './event-stream-version.valueobject';
import { StorageEventEntry } from './storage-event-entry';
import { EventStreamName } from '@coders-board-library/event-sourcing/api/event-stream-name.valueboject';

export const EVENT_STORAGE = 'EventStorage';

export interface EventStorage {
  store(eventStreamName: EventStreamName, event: StorageEventEntry, expectedVersion?: EventStreamVersion): Promise<any>;

  //TODO: Consider interface change to return stored events and errors
  // or leave only method for store one event or do storeAll in one transaction
  storeAll(
    eventStreamName: EventStreamName,
    events: StorageEventEntry[],
    expectedVersion?: EventStreamVersion,
  ): Promise<any>;

  readEvents(eventStreamName: EventStreamName, toDate?: Date): Promise<StorageEventEntry[]>;
}
