import { Module } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus } from '@nestjs/cqrs';
import { CodersBoardTimeProviderAdapter } from './time/coders-board-time-provider.adapter';
import {
  TIME_PROVIDER,
  TimeProvider,
  TimeProviderModule,
} from '@coders-board-library/time-provider';
import { EventSourcingModule } from '@coders-board-library/event-sourcing';
import { DOMAIN_EVENT_PUBLISHER } from './domain-event-publisher/domain-event-publisher';
import { NestJsDomainEventPublisher } from './domain-event-publisher/nestjs-domain-event-publisher';
import { LoggingDomainEventPublisher } from './domain-event-publisher/logging-domain-event-publisher';
import { EXTERNAL_EVENT_PUBLISHER } from '../application/external-event-publisher/external-event-publisher';
import { LoggingExternalEventPublisher } from './external-event-publisher/logging-external-event-publisher';
import { NestJsExternalEventPublisher } from './external-event-publisher/nest-js-external-event-publisher';
import { EXTERNAL_COMMAND_SENDER } from '../application/external-command-sender/external-command-sender';
import { NestJsExternalCommandSender } from './external-command-sender/nest-js-external-command-sender';
import {
  EVENT_STORAGE,
  EventStorage,
} from '@coders-board-library/event-sourcing/api/event-storage';
import { INTERNAL_COMMAND_SENDER } from '../application/internal-command-sender/internal-command-sender';
import { NestJsInternalCommandSender } from './internal-command-sender/nest-js-internal-command-sender';

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
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : 5002,
    username: process.env.DATABASE_USERNAME ? process.env.DATABASE_USERNAME : 'postgres',
    password: process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : 'postgres',
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

const eventStoreEventSourcingModule = EventSourcingModule.registerEventStoreAsync({
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
    ? eventStoreEventSourcingModule
    : inMemoryEventSourcingModule;

@Module({
  imports: [CqrsModule, timeProviderModule, eventSourcingModule],
  providers: [
    {
      provide: TIME_PROVIDER,
      useClass: CodersBoardTimeProviderAdapter,
    },
    {
      provide: DOMAIN_EVENT_PUBLISHER,
      inject: [EventBus],
      useFactory: (eventBus: EventBus) =>
        new LoggingDomainEventPublisher(new NestJsDomainEventPublisher(eventBus)),
    },
    {
      provide: EXTERNAL_EVENT_PUBLISHER,
      inject: [EventBus, EVENT_STORAGE],
      useFactory: (eventBus: EventBus, eventStorage: EventStorage) =>
        new LoggingExternalEventPublisher(new NestJsExternalEventPublisher(eventBus)),
    },
    {
      provide: EXTERNAL_COMMAND_SENDER,
      inject: [CommandBus],
      useFactory: (commandBus: CommandBus) => new NestJsExternalCommandSender(commandBus),
    },
    {
      provide: INTERNAL_COMMAND_SENDER,
      inject: [CommandBus],
      useFactory: (commandBus: CommandBus) => new NestJsInternalCommandSender(commandBus),
    },
  ],
  exports: [
    CqrsModule,
    TIME_PROVIDER,
    eventSourcingModule,
    timeProviderModule,
    DOMAIN_EVENT_PUBLISHER,
    EXTERNAL_EVENT_PUBLISHER,
    EXTERNAL_COMMAND_SENDER,
    INTERNAL_COMMAND_SENDER,
  ],
})
export class SharedKernelInfrastructureModule {}
