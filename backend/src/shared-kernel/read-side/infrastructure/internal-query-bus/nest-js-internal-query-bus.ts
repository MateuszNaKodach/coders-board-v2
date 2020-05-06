import { QueryBus } from '@nestjs/cqrs';
import { InternalQueryBus } from '../../query/internal-query-bus';

export class NestJsInternalQueryBus implements InternalQueryBus {
  constructor(private readonly queryBus: QueryBus) {}

  execute<TQuery, TResult>(query: TQuery): Promise<TResult> {
    return this.queryBus.execute<TQuery, TResult>(query);
  }
}
