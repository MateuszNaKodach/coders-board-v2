import { AbstractAggregateRoot } from '../../../../src/shared-kernel/write-side/domain/abstract-aggregate-root';
import { TimeProviderPort } from '../../../../src/shared-kernel/write-side/domain/time-provider.port';
import { AggregateId } from '../../../../src/shared-kernel/write-side/domain/aggregate-id.valueobject';
import { AbstractDomainEvent } from '../../../../src/shared-kernel/write-side/domain/abstract-domain-event';
import { DomainEventId } from '../../../../src/shared-kernel/write-side/domain/domain-event-id.valueobject';
import { SystemTimeProvider } from '@coders-board-library/time-provider/system-time-provider';
import { expectDomainEvent } from '../../../../src/shared-kernel/write-side/domain/aggregate-root.test-utils';

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
      data: P,
    ) {
      super(eventId, occurredAt, aggregateId, data);
    }

    get aggregateType(): string {
      return 'SampleAggregateRoot';
    }
  }

  type SomethingHappenedData = {
    stringVariable: string;
    numberVariable: number;
  };

  export class SomethingHappened extends AbstractSampleAbstractDomainEvent<
    SomethingHappenedData
  > {
    static newFrom(
      aggregateId: SampleAggregateId,
      occurredAt: Date,
      data: SomethingHappenedData,
    ) {
      return new SomethingHappened(
        DomainEventId.generate(),
        occurredAt,
        aggregateId,
        data,
      );
    }
  }

  export class SomethingWithoutEventHandlerHappened extends AbstractSampleAbstractDomainEvent<{}> {
    static newFrom(aggregateId: SampleAggregateId, occurredAt: Date, data: {}) {
      return new SomethingWithoutEventHandlerHappened(
        DomainEventId.generate(),
        occurredAt,
        aggregateId,
        data,
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
    this.stringVariable = event.data.stringVariable;
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
          data: command,
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
