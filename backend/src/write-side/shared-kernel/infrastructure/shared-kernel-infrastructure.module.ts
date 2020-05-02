import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CodersBoardTimeProviderAdapter } from './time/coders-board-time-provider.adapter';
import {
  TIME_PROVIDER,
  TimeProvider,
  TimeProviderModule,
} from '@coders-board-library/time-provider';
import { EventSourcingModule } from '@coders-board-library/event-sourcing';

const timeProviderModule = TimeProviderModule.register({ source: 'system' });
const typeOrmEventSourcingModule = EventSourcingModule.registerTypeOrmAsync(
  {
    imports: [timeProviderModule],
    inject: [TimeProvider],
    useFactory: (timeProvider: TimeProvider) => {
      return {
        time: timeProvider.currentDate,
      };
    },
  },
  {
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
    synchronize: true,
  },
);
const inMemoryEventSourcingModule = EventSourcingModule.registerInMemoryAsync({
  imports: [timeProviderModule],
  inject: [TimeProvider],
  useFactory: (timeProvider: TimeProvider) => {
    return {
      time: timeProvider.currentDate,
    };
  },
});

const eventSourcingModule =
  'typeorm' === process.env.EVENTSOURCING_MODE
    ? typeOrmEventSourcingModule
    : 'eventstore' === process.env.EVENTSOURCING_MODE
    ? null
    : inMemoryEventSourcingModule;

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
