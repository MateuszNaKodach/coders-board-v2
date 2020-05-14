import { ExternalEventPublisher } from '../../application/external-event-publisher/external-event-publisher';
import { EventBus } from '@nestjs/cqrs';
import { PublicEvent } from '@coders-board-library/public-messages';

export class NestJsExternalEventPublisher implements ExternalEventPublisher {
  constructor(private readonly eventBus: EventBus) {}

  publish<T extends PublicEvent>(event: T) {
    if (event.eventId === undefined) {
      return;
    }
    return this.eventBus.publish(event);
  }

  publishAll(events: PublicEvent[]) {
    return this.eventBus.publishAll(events.filter(e => e.eventId !== undefined));
  }
}
