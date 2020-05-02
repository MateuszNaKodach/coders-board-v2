import { EventStreamVersion } from './event-stream-version.valueobject';
import { StorageEventEntry } from './storage-event-entry';
import { EventStreamId } from '@coders-board-library/event-sourcing/api/event-stream-id.valueboject';

export const EVENT_STORAGE = 'EventStorage';

export interface EventStorage {
  store(
    eventStreamId: EventStreamId,
    event: StorageEventEntry,
    expectedVersion?: EventStreamVersion,
  ): Promise<any>;

  //TODO: Consider interface change to return stored events and errors
  // or leave only method for store one event or do storeAll in one transaction
  storeAll(
    eventStreamId: EventStreamId,
    events: StorageEventEntry[],
    expectedVersion?: EventStreamVersion,
  ): Promise<any>;

  readEvents(
    eventStreamId: EventStreamId,
    toDate?: Date,
  ): Promise<StorageEventEntry[]>;
}
