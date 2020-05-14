import { ExternalEventPublisher } from '../../application/external-event-publisher/external-event-publisher';
import { PublicEvent } from '@coders-board-library/public-messages';
import { EventStorage } from '@coders-board-library/event-sourcing/api/event-storage';
import { StorageEventEntry } from '@coders-board-library/event-sourcing/api/storage-event-entry';
import { EventStreamId } from '@coders-board-library/event-sourcing/api/event-stream-id.valueboject';

const PUBLIC_EVENT_STORAGE_GROUP_PREFIX = 'PUBLIC_';

export class StoreInEventStorageAndForwardExternalEventBus implements ExternalEventPublisher {
  constructor(private readonly eventStorage: EventStorage, private readonly delegate: ExternalEventPublisher) {}

  async publish<T extends PublicEvent>(event: T) {
    if (!event.eventId) {
      return;
    }
    await this.eventStorage.store(
      EventStreamId.from(PUBLIC_EVENT_STORAGE_GROUP_PREFIX + event.aggregateType, event.aggregateId),
      StoreInEventStorageAndForwardExternalEventBus.toStoragePublicEventEntry(event),
    );
    return this.delegate.publish(event);
  }

  async publishAll(events: PublicEvent[]) {
    return Promise.all([events.filter(e => e.eventId).map(e => this.publish(e))]);
  }

  private static toStoragePublicEventEntry(event: PublicEvent): StorageEventEntry {
    return {
      eventId: event.eventId,
      streamId: event.aggregateId,
      streamGroup: event.aggregateType,
      occurredAt: event.occurredAt,
      eventType: event.eventType,
      data: event.data,
    };
  }
}
