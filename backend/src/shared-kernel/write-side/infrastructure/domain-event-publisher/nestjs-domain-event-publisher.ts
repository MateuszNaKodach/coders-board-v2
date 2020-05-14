import { DomainEventPublisher } from './domain-event-publisher';
import { EventBus } from '@nestjs/cqrs';
import { DomainEvent } from '../../domain/domain-event';

export class NestJsDomainEventPublisher implements DomainEventPublisher {
  constructor(private readonly eventBus: EventBus) {}

  publish<T extends DomainEvent>(event: T) {
    if (event.eventId === undefined || event.eventId.raw === undefined) {
      return;
    }
    return this.eventBus.publish(event);
  }

  publishAll(events: DomainEvent[]) {
    return this.eventBus.publishAll(events.filter(e => e.eventId && e.eventId.raw));
  }
}
