import { DomainEvent } from '../../shared-kernel/domain/domain-event';

export interface DomainEventPublisher {
  publish<T extends DomainEvent>(event: T): void;
  publishAll(events: DomainEvent[]): void;
}
