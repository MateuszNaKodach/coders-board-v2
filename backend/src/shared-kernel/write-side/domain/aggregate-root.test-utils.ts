import { DomainEvent } from './domain-event';
import { AbstractAggregateRoot } from './abstract-aggregate-root';
import { AbstractDomainEvent } from './abstract-domain-event';

export interface Type<T> extends Function {
  new (...args: any[]): T;
}

export type ExpectedDomainEvent<T extends DomainEvent> = {
  type: Type<T>;
  data: T['data'];
};

export function expectDomainEvent<T extends DomainEvent>(
  aggregateRoot: AbstractAggregateRoot<any>,
  expected: ExpectedDomainEvent<T>,
) {
  const domainEvents = aggregateRoot.getUncommittedEvents().filter(it => isDomainEvent(it));
  const foundEvent = domainEvents.find(it => it instanceof expected.type);
  if (isDomainEvent(foundEvent)) {
    expect(foundEvent).toBeInstanceOf(expected.type);
    expect(foundEvent.data).toStrictEqual(expected.data);
  } else {
    throw new Error('Aggregate root has not applied expected domain event!');
  }
}

export function isDefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}

export function isDomainEvent(event: unknown | undefined): event is DomainEvent {
  return isDefined(event) && event instanceof AbstractDomainEvent;
}
