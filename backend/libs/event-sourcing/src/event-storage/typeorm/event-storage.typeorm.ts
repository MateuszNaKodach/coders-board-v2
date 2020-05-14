import { EventStorage } from '../../api/event-storage';
import * as moment from 'moment';
import { EventStreamVersion } from '../../api/event-stream-version.valueobject';
import { InjectRepository } from '@nestjs/typeorm';
import { DomainEventEntity } from './event.typeorm-entity';
import { StorageEventEntry } from '../../api/storage-event-entry';
import { Repository } from 'typeorm';
import { Time } from '../../time.type';
import { EventStreamName } from '@coders-board-library/event-sourcing/api/event-stream-name.valueboject';

export class TypeOrmEventStorage implements EventStorage {
  constructor(
    private readonly time: Time,
    @InjectRepository(DomainEventEntity)
    private readonly typeOrmRepository: Repository<DomainEventEntity>,
  ) {}

  async store(
    eventStreamName: EventStreamName,
    event: StorageEventEntry,
    expectedVersion?: EventStreamVersion,
  ): Promise<void> {
    const aggregateEvents = await this.typeOrmRepository.count({
      where: { streamId: eventStreamName.streamId },
    });
    if (expectedVersion && expectedVersion.raw !== aggregateEvents) {
      throw new Error(`Event stream for aggregate was modified concurrently!`);
    }
    const nextEventOrder = aggregateEvents + 1;
    const typeOrmDomainEvent = DomainEventEntity.fromProps({
      ...event,
      order: nextEventOrder,
    });
    return this.typeOrmRepository.save(typeOrmDomainEvent).then();
  }

  async storeAll(eventStreamName: EventStreamName, events: StorageEventEntry[]): Promise<void> {
    const aggregateEvents = await this.typeOrmRepository.count({
      where: { streamId: eventStreamName.streamId },
    });
    const nextEventOrder = aggregateEvents + 1;
    const typeOrmEvents = events
      .filter(event => event.streamId === eventStreamName.streamId)
      .map((e, i) => DomainEventEntity.fromProps({ ...e, order: nextEventOrder + i }));
    return this.typeOrmRepository.save(typeOrmEvents).then();
  }

  readEvents(eventStreamName: EventStreamName, toDate?: Date) {
    const maxEventDate = toDate ? toDate : this.time();
    return this.typeOrmRepository
      .find({ where: { streamId: eventStreamName.streamId } }) // TODO: Query with occurredAt
      .then(found => found.filter(it => moment(it.occurredAt).isSameOrBefore(moment(maxEventDate))));
  }
}
