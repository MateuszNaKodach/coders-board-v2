import { AggregateId } from './aggregate-id.valueobject';
import { AbstractDomainEvent } from './abstract-domain-event';

export abstract class AbstractSuccessDomainEvent<
  I extends AggregateId = AggregateId,
  T = any
> extends AbstractDomainEvent<I, T> {}
