import { AbstractAggregateRoot } from './abstract-aggregate-root';
import { TimeProviderPort } from './time-provider.port';
import { AggregateId } from './aggregate-id.valueobject';
import { AbstractDomainEvent } from './abstract-domain-event';
import { DomainEventId } from './domain-event-id.valueobject';
import { SystemTimeProvider } from '@coders-board-library/time-provider/system-time-provider';
import { expectDomainEvent } from './aggregate-root.test-utils';

class SampleAggregateId implements AggregateId {
  private readonly TYPE = 'SampleAggregateId';

  private constructor(readonly raw: string) {}

  static of(raw: string) {
    return new SampleAggregateId(raw);
  }

  toString() {
    return this.raw;
  }
}

export namespace SampleDomainEvent {
  abstract class AbstractSampleAbstractDomainEvent<
    P = any
  > extends AbstractDomainEvent<SampleAggregateId, P> {
    constructor(
      eventId: DomainEventId,
      occurredAt: Date,
      aggregateId: SampleAggregateId,
      payload: P,
    ) {
      super(eventId, occurredAt, aggregateId, payload);
    }

    get aggregateType(): string {
      return 'SampleAggregateRoot';
    }
  }

  type SomethingHappenedPayload = {
    stringVariable: string;
    numberVariable: number;
  };

  export class SomethingHappened extends AbstractSampleAbstractDomainEvent<
    SomethingHappenedPayload
  > {
    static newFrom(
      aggregateId: SampleAggregateId,
      occurredAt: Date,
      payload: SomethingHappenedPayload,
    ) {
      return new SomethingHappened(
        DomainEventId.generate(),
        occurredAt,
        aggregateId,
        payload,
      );
    }
  }

  export class SomethingWithoutEventHandlerHappened extends AbstractSampleAbstractDomainEvent<{}> {
    static newFrom(
      aggregateId: SampleAggregateId,
      occurredAt: Date,
      payload: {},
    ) {
      return new SomethingWithoutEventHandlerHappened(
        DomainEventId.generate(),
        occurredAt,
        aggregateId,
        payload,
      );
    }
  }
}

class SampleAggregateRoot extends AbstractAggregateRoot<SampleAggregateId> {
  private stringVariable: string;

  constructor(timeProvider: TimeProviderPort) {
    super(timeProvider);
  }

  doSomething(
    id: SampleAggregateId,
    command: { stringVariable: string; numberVariable: number },
  ) {
    this.apply(
      SampleDomainEvent.SomethingHappened.newFrom(id, this.currentDate, {
        ...command,
      }),
    );
  }

  onSomethingHappened(event: SampleDomainEvent.SomethingHappened) {
    this.id = event.aggregateId;
    this.stringVariable = event.payload.stringVariable;
  }

  doSomethingWithoutEventHandler() {
    this.apply(
      SampleDomainEvent.SomethingWithoutEventHandlerHappened.newFrom(
        this.id,
        this.currentDate,
        {},
      ),
    );
  }
}

describe('Feature: Event Sourced Aggregate Root', () => {
  const timeProvider: TimeProviderPort = new SystemTimeProvider();
  const sampleAggregateId = SampleAggregateId.of('SampleAggregateId');
  let sampleAggregateRoot: SampleAggregateRoot;

  beforeEach(() => {
    sampleAggregateRoot = new SampleAggregateRoot(timeProvider);
  });

  describe('Given: Sample aggregate root', () => {
    const command = {
      stringVariable: 'string',
      numberVariable: 123,
    };

    describe('When: Invoke method with handler', () => {
      beforeEach(() => {
        sampleAggregateRoot.doSomething(sampleAggregateId, {
          ...command,
        });
      });

      it('Then: Event should be applied', () => {
        expectDomainEvent(sampleAggregateRoot, {
          type: SampleDomainEvent.SomethingHappened,
          payload: command,
        });
      });
    });

    describe('When: Invoke method without handler', () => {
      it('Then: Event should not be applied', () => {
        expect(() =>
          sampleAggregateRoot.doSomethingWithoutEventHandler(),
        ).toThrow(
          new Error(
            'Handler for domain event SomethingWithoutEventHandlerHappened not found!',
          ),
        );
      });
    });
  });
});
