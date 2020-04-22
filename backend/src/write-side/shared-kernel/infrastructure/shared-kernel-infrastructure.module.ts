import {
  DynamicModule,
  ForwardReference,
  Inject,
  Module,
  Type,
} from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CodersBoardTimeProviderAdapter } from './time/coders-board-time-provider.adapter';
import {
  TIME_PROVIDER,
  TimeProvider,
  TimeProviderModule,
} from '@coders-board-library/time-provider';
import { EventSourcingModule } from '@coders-board-library/event-sourcing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainEventEntity } from '@coders-board-library/event-sourcing/event-storage/typeorm/event.typeorm-entity';

const modules: Array<
  Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
> = [];

if ('typeorm' === process.env.DATABASE_MODE) {
  const typeOrmModule = TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT
      ? parseInt(process.env.DATABASE_PORT, 10)
      : 5002,
    username: process.env.DATABASE_USERNAME
      ? process.env.DATABASE_USERNAME
      : 'postgres',
    password: process.env.DATABASE_PASSWORD
      ? process.env.DATABASE_PASSWORD
      : 'postgres',
    database: 'coders-board',
    entities: [__dirname + '/**/*.typeorm-entity{.ts,.js}'],
    synchronize: true,
  });
  modules.push(typeOrmModule);
}

const timeProviderModule = TimeProviderModule.register({ source: 'system' });
const eventSourcingModule = EventSourcingModule.registerAsync({
  imports: [timeProviderModule],
  inject: [TimeProvider],
  useFactory: (timeProvider: TimeProvider) => {
    return 'typeorm' === process.env.DATABASE_MODE
      ? {
          time: timeProvider.currentDate,
          eventStorage: 'in-memory',
        }
      : {
          time: timeProvider.currentDate,
          eventStorage: 'typeorm',
          typeOrmModule: TypeOrmModule.forFeature([DomainEventEntity]),
        };
  },
});

@Module({
  imports: [CqrsModule, timeProviderModule, eventSourcingModule],
  providers: [
    {
      provide: TIME_PROVIDER,
      useClass: CodersBoardTimeProviderAdapter,
    },
  ],
  exports: [CqrsModule, TIME_PROVIDER, eventSourcingModule, timeProviderModule],
})
export class SharedKernelInfrastructureModule {}
