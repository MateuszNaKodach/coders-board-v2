import { EventStorage } from '../../api/event-storage';
import * as moment from 'moment';
import { EventStreamVersion } from '../../api/event-stream-version.valueobject';
import { InjectRepository } from '@nestjs/typeorm';
import { DomainEventEntity } from './event.typeorm-entity';
import { StorageEventEntry } from '../../api/storage-event-entry';
import { Repository } from 'typeorm';
import { Time } from '../../time.type';
import { EventStreamId } from '@coders-board-library/event-sourcing/api/event-stream-id.valueboject';

export class TypeOrmEventStorage implements EventStorage {
  constructor(
    private readonly time: Time,
    @InjectRepository(DomainEventEntity)
    private readonly typeOrmRepository: Repository<DomainEventEntity>,
  ) {}

  async store(
    eventStreamId: EventStreamId,
    event: StorageEventEntry,
    expectedVersion?: EventStreamVersion,
  ): Promise<void> {
    const aggregateEvents = await this.typeOrmRepository.count({
      where: { streamId: eventStreamId.streamId },
    });
    if (expectedVersion && expectedVersion.raw !== aggregateEvents) {
      throw new Error(
        `Event stream for aggregate was modified! Expected version: ${expectedVersion.raw}, but actual is: ${aggregateEvents}`,
      );
    }
    const nextEventOrder = aggregateEvents + 1;
    const typeOrmDomainEvent = DomainEventEntity.fromProps({
      ...event,
      order: nextEventOrder,
    });
    return this.typeOrmRepository.save(typeOrmDomainEvent).then();
  }

  async storeAll(eventStreamId: EventStreamId, events: StorageEventEntry[]): Promise<void> {
    const aggregateEvents = await this.typeOrmRepository.count({
      where: { streamId: eventStreamId.streamId },
    });
    const nextEventOrder = aggregateEvents + 1;
    const typeOrmEvents = events
      .filter(event => event.streamId === eventStreamId.streamId)
      .map((e, i) => DomainEventEntity.fromProps({ ...e, order: nextEventOrder + i }));
    return this.typeOrmRepository.save(typeOrmEvents).then();
  }

  readEvents(eventStreamId: EventStreamId, toDate?: Date) {
    const maxEventDate = toDate ? toDate : this.time();
    return this.typeOrmRepository
      .find({ where: { streamId: eventStreamId.streamId } }) // TODO: Query with occurredAt
      .then(found => found.filter(it => moment(it.occurredAt).isSameOrBefore(moment(maxEventDate))));
  }
}
