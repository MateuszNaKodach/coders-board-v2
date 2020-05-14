import { DomainEvent } from './domain-event';
import { DomainEventId } from './domain-event-id.valueobject';
import { AggregateId } from './aggregate-id.valueobject';

export abstract class AbstractDomainEvent<I extends AggregateId = AggregateId, T = any>
  implements DomainEvent<I, T> {
  readonly eventId: DomainEventId;
  readonly occurredAt: Date;
  readonly aggregateId: I;
  readonly data: T;

  protected constructor(eventId: DomainEventId, occurredAt: Date, aggregateId: I, data: T) {
    this.eventId = eventId;
    this.occurredAt = occurredAt;
    this.aggregateId = aggregateId;
    this.data = data;
  }

  get eventType(): string {
    return Object.getPrototypeOf(this).constructor.name;
  }

  abstract get aggregateType(): string;
}
