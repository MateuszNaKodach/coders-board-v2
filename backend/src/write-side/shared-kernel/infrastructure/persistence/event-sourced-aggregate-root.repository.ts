import { EventBus } from '@nestjs/cqrs';
import { AbstractAggregateRoot } from '../../domain/abstract-aggregate-root';
import { AggregateId } from '../../domain/aggregate-id.valueobject';
import { AggregateRootRepository } from '../../domain/aggregate-root.repository';
import { DomainEvent } from '../../domain/domain-event';
import { EventStorage } from '@coders-board-library/event-sourcing/api/event-storage';
import { StorageEventEntry } from '@coders-board-library/event-sourcing/api/storage-event-entry';
import { TimeProviderPort } from '../../domain/time-provider.port';
import { EventStreamId } from '@coders-board-library/event-sourcing/api/event-stream-id.valueboject';
import { EventStreamVersion } from '@coders-board-library/event-sourcing/api/event-stream-version.valueobject';

export abstract class EventSourcedAggregateRootRepository<
  I extends AggregateId,
  T extends AbstractAggregateRoot<I>
> implements AggregateRootRepository<I, T> {
  protected abstract aggregateType: string;

  protected constructor(
    protected readonly timeProvider: TimeProviderPort,
    private readonly eventStorage: EventStorage,
    private readonly eventBus: EventBus,
  ) {}

  async findById(id: I): Promise<T | null> {
    const events = await this.eventStorage.readEvents(
      EventStreamId.props({
        aggregateId: id.raw,
        aggregateType: this.aggregateType,
      }),
    );
    if (events.length === 0) {
      return Promise.resolve(null);
    }
    const aggregate = this.newAggregate();
    aggregate.loadFromHistory(events.map(this.recreateEventFromStorage));
    return Promise.resolve(aggregate);
  }

  protected abstract newAggregate(): T;

  protected abstract recreateEventFromStorage(
    event: StorageEventEntry,
  ): DomainEvent;

  save(aggregate: T): Promise<void> {
    const uncommitedEvents = aggregate
      .getUncommittedEvents()
      .map(it =>
        EventSourcedAggregateRootRepository.toStorageDomainEventEntry(
          it as DomainEvent,
        ),
      );
    return this.eventStorage
      .storeAll(
        EventStreamId.props({
          aggregateId: aggregate.aggregateId.raw,
          aggregateType: this.aggregateType,
        }),
        uncommitedEvents,
        EventStreamVersion.exactly(aggregate.aggregateVersion.raw),
      )
      .then(() => this.eventBus.publishAll(aggregate.getUncommittedEvents()))
      .then(() => aggregate.clearUncommittedEvents());
  }

  private static toStorageDomainEventEntry(
    event: DomainEvent,
  ): StorageEventEntry {
    return {
      eventId: event.eventId.raw,
      aggregateId: event.aggregateId.raw,
      aggregateType: event.aggregateType,
      occurredAt: event.occurredAt,
      eventType: event.eventType,
      payload: event.payload,
    };
  }
}
