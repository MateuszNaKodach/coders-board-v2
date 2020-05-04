import { DomainEvent } from '../../domain/domain-event';

export const DOMAIN_EVENT_PUBLISHER = Symbol('DOMAIN_EVENT_PUBLISHER');

export interface DomainEventPublisher {
  publish<T extends DomainEvent>(event: T): void;
  publishAll(events: DomainEvent[]): void;
}
