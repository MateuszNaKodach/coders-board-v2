import { AggregateId } from './aggregate-id.valueobject';
import { AbstractDomainEvent } from './abstract-domain-event';
import { FailureReason } from './failure-reason';

export abstract class AbstractFailureDomainEvent<
  I extends AggregateId = AggregateId,
  T extends FailureReason = FailureReason
> extends AbstractDomainEvent<I, T> {}
