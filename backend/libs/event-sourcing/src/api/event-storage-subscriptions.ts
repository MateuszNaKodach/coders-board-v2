import { EventStreamName } from '@coders-board-library/event-sourcing/api/event-stream-name.valueboject';
import { Observable } from 'rxjs';
import { StorageEventEntry } from '@coders-board-library/event-sourcing/api/storage-event-entry';
import { SubscriptionInfo } from '@coders-board-library/event-sourcing/api/subscription-info';

export const EVENT_STORAGE_SUBSCRIPTIONS = Symbol('EVENT_STORAGE_SUBSCRIPTIONS');

export interface EventStorageSubscriptions {
  subscribeForBatches(eventStreamName: EventStreamName, subscriberGroupName: string): Observable<StorageEventEntry[]>;

  observeFor(eventStreamName: EventStreamName, subscriberGroupName: string): Observable<StorageEventEntry>;

  observeForBatch(
    eventStreamName: EventStreamName,
    subscriberGroupName: string,
    batchSize: number,
  ): Observable<StorageEventEntry>;

  subscribeFor(
    eventStreamName: EventStreamName,
    subscriberGroupName: string,
    subscriber: (event: StorageEventEntry) => unknown,
  ): Promise<void>;

  subscriptionInfo(eventStreamName: EventStreamName, subscriberGroupName: string): Observable<SubscriptionInfo>;
}
