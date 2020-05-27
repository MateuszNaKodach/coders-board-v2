import { EventStreamName } from '@coders-board-library/event-sourcing/api/event-stream-name.valueboject';
import { Observable } from 'rxjs';
import { StorageEventEntry } from '@coders-board-library/event-sourcing/api/storage-event-entry';

export const EVENT_STORAGE_SUBSCRIPTIONS = Symbol('EVENT_STORAGE_SUBSCRIPTIONS');

export interface EventStorageSubscriptions {
  subscribeForBatches(
    eventStreamName: EventStreamName | string,
    subscriberGroupName: string,
  ): Observable<StorageEventEntry[]>;

  observeFor(eventStreamName: EventStreamName | string, subscriberGroupName: string): Observable<StorageEventEntry>;

  subscribeFor(
    eventStreamName: EventStreamName | string,
    subscriberGroupName: string,
    subscriber: (event: StorageEventEntry) => unknown,
  ): Promise<void>;
}
