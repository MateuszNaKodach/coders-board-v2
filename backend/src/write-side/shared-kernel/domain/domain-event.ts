import { AggregateId } from './aggregate-id.valueobject';
import { DomainEventId } from './domain-event-id.valueobject';

/**
 * Domain event can be used only inside one context - for communication between aggregates and storing state in event sourcing manner.
 * Cannot be referenced from another module, because changes in those events shouldn't
 * impact on communication between modules, which may cause cascading changes.
 */
export interface DomainEvent<I extends AggregateId = AggregateId, T = any> {
  readonly eventId: DomainEventId;
  readonly occurredAt: Date;
  readonly eventType: string;
  readonly aggregateId: I;
  readonly aggregateType: string;
  readonly payload: T;
}
