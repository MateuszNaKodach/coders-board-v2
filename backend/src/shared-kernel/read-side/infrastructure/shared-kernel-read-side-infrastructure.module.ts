import { Module } from '@nestjs/common';
import { CqrsModule, QueryBus } from '@nestjs/cqrs';
import { INTERNAL_QUERY_BUS } from '../query/internal-query-bus';
import { NestJsInternalQueryBus } from './internal-query-bus/nest-js-internal-query-bus';

@Module({
  imports: [CqrsModule],
  providers: [
    {
      provide: INTERNAL_QUERY_BUS,
      inject: [QueryBus],
      useFactory: (queryBus: QueryBus) => new NestJsInternalQueryBus(queryBus),
    },
  ],
  exports: [INTERNAL_QUERY_BUS],
})
export class SharedKernelReadSideInfrastructureModule {}
