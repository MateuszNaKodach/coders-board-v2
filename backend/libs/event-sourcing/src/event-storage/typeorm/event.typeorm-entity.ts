import { Entity, Column, PrimaryColumn, Index } from 'typeorm';
import { StorageEventEntry } from '../../api/storage-event-entry';

@Entity({ name: 'eventsourcing_domain_events', orderBy: { occurredAt: 'ASC' } })
@Index(['streamId', 'order'], { unique: true })
export class DomainEventEntity implements StorageEventEntry {
  @PrimaryColumn()
  readonly eventId: string;

  @Column()
  readonly eventType: string;

  @Column({ type: 'timestamp' })
  readonly occurredAt: Date;

  @Column()
  readonly streamId: string;

  @Column()
  readonly streamGroup: string;

  @Column()
  readonly order: number;

  @Column({ type: 'json' })
  readonly data: unknown;

  constructor(
    eventId: string,
    eventType: string,
    occurredAt: Date,
    streamId: string,
    streamGroup: string,
    order: number,
    data: unknown,
  ) {
    this.eventId = eventId;
    this.eventType = eventType;
    this.occurredAt = occurredAt;
    this.streamId = streamId;
    this.order = order;
    this.data = data;
    this.streamGroup = streamGroup;
  }

  static fromProps(props: {
    eventId: string;
    eventType: string;
    occurredAt: Date;
    streamId: string;
    streamGroup: string;
    order: number;
    data: unknown;
  }) {
    return new DomainEventEntity(
      props.eventId,
      props.eventType,
      props.occurredAt,
      props.streamId,
      props.streamGroup,
      props.order,
      props.data,
    );
  }
}
