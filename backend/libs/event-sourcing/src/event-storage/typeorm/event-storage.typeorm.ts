import { EventStorage } from '../event-storage';
import * as moment from 'moment';
import { Injectable } from '@nestjs/common';
import { EventStreamVersion } from '../../api/event-stream-version.valueobject';
import { InjectRepository } from '@nestjs/typeorm';
import { DomainEventEntity } from './event.typeorm-entity';
import { StorageEventEntry } from '../../api/storage-event-entry';
import { Repository } from 'typeorm';
import { Time } from '../../time.type';

@Injectable()
export class TypeOrmEventStorage implements EventStorage {
  constructor(
    private readonly time: Time,
    @InjectRepository(DomainEventEntity)
    private readonly typeOrmRepository: Repository<DomainEventEntity>,
  ) {}

  async store(
    event: StorageEventEntry,
    expectedVersion?: EventStreamVersion,
  ): Promise<void> {
    const aggregateEvents = await this.typeOrmRepository.count({
      where: { aggregateId: event.aggregateId },
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

  //TODO: Check if events are from one stream!
  async storeAll(events: StorageEventEntry[]): Promise<void> {
    const aggregateEvents = await this.typeOrmRepository.count({
      where: { aggregateId: events[0].aggregateId },
    });
    const nextEventOrder = aggregateEvents + 1;
    const typeOrmEvents = events.map((e, i) =>
      DomainEventEntity.fromProps({ ...e, order: nextEventOrder + i }),
    );
    return this.typeOrmRepository.save(typeOrmEvents).then();
  }

  readEvents(aggregateId: string, toDate?: Date) {
    const maxEventDate = toDate ? toDate : this.time();
    return this.typeOrmRepository
      .find({ where: { aggregateId } }) // TODO: Query with occurredAt
      .then(found =>
        found.filter(it =>
          moment(it.occurredAt).isSameOrBefore(moment(maxEventDate)),
        ),
      );
  }
}
