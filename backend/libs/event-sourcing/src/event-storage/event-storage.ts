import { EventStreamVersion } from '../api/event-stream-version.valueobject';
import { StorageEventEntry } from '../api/storage-event-entry';

export const EVENT_STORAGE = 'EventStorage';

export interface EventStorage {
  store(
    event: StorageEventEntry,
    expectedVersion?: EventStreamVersion,
  ): Promise<void>;

  //TODO: Consider interface change to return stored events and errors
  // or leave only method for store one event or do storeAll in one transaction
  storeAll(
    events: StorageEventEntry[],
    expectedVersion?: EventStreamVersion,
  ): Promise<void>;

  readEvents(aggregateId: string, toDate?: Date): Promise<StorageEventEntry[]>;
}
