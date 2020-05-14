import { AbstractAggregateRoot } from './abstract-aggregate-root';
import { AggregateId } from './aggregate-id.valueobject';

export interface AggregateRootRepository<I extends AggregateId, T extends AbstractAggregateRoot<I>> {
  save(aggregate: T): Promise<void>;

  findById(id: I): Promise<T | null>;
}
