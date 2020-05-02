import { EventStorage } from '../../api/event-storage';
import * as moment from 'moment';
import { Injectable } from '@nestjs/common';
import { EventStreamVersion } from '../../api/event-stream-version.valueobject';
import { InjectRepository } from '@nestjs/typeorm';
import { DomainEventEntity } from './event.typeorm-entity';
import { StorageEventEntry } from '../../api/storage-event-entry';
import { Repository } from 'typeorm';
import { Time } from '../../time.type';
import { EventStreamId } from '@coders-board-library/event-sourcing/api/event-stream-id.valueboject';

@Injectable()
export class TypeOrmEventStorage implements EventStorage {
  constructor(
    private readonly time: Time,
    @InjectRepository(DomainEventEntity)
    private readonly typeOrmRepository: Repository<DomainEventEntity>,
  ) {}

  async store(
    streamId: EventStreamId,
    event: StorageEventEntry,
    expectedVersion?: EventStreamVersion,
  ): Promise<void> {
    const aggregateEvents = await this.typeOrmRepository.count({
      where: { aggregateId: streamId.aggregateId },
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
  async storeAll(
    streamId: EventStreamId,
    events: StorageEventEntry[],
  ): Promise<void> {
    const aggregateEvents = await this.typeOrmRepository.count({
      where: { aggregateId: streamId.aggregateId },
    });
    const nextEventOrder = aggregateEvents + 1;
    const typeOrmEvents = events
      .filter(event => event.aggregateId === streamId.aggregateId)
      .map((e, i) =>
        DomainEventEntity.fromProps({ ...e, order: nextEventOrder + i }),
      );
    return this.typeOrmRepository.save(typeOrmEvents).then();
  }

  readEvents(streamId: EventStreamId, toDate?: Date) {
    const maxEventDate = toDate ? toDate : this.time();
    return this.typeOrmRepository
      .find({ where: { aggregateId: streamId.aggregateId } }) // TODO: Query with occurredAt
      .then(found =>
        found.filter(it =>
          moment(it.occurredAt).isSameOrBefore(moment(maxEventDate)),
        ),
      );
  }
}
