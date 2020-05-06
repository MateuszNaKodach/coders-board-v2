import {
  DynamicModule,
  HttpModule,
  HttpService,
  Module,
  Provider,
} from '@nestjs/common';
import { EVENT_STORAGE } from './api/event-storage';
import { TypeOrmEventStorage } from './event-storage/typeorm/event-storage.typeorm';
import { InMemoryEventStorage } from './event-storage/in-memory/event-storage.in-memory';
import { DomainEventEntity } from './event-storage/typeorm/event.typeorm-entity';
import { EventSourcingModuleConfig } from './event-sourcing.module-config';
import { Connection, createConnection } from 'typeorm';
import { EventSourcingModuleAsyncConfig } from '@coders-board-library/event-sourcing/event-sourcing.module-async-config';
import { EventSourcingModuleConfigFactory } from '@coders-board-library/event-sourcing/event-sourcing.module-config-factory';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { EventStoreEventStorage } from '@coders-board-library/event-sourcing/event-storage/eventstore/event-storage.eventstore';

const EVENT_SOURCING_CONFIG = Symbol();
const DEFAULT_EVENT_STORAGE_NAME = 'public';

@Module({})
export class EventSourcingModule {
  static registerTypeOrmAsync(
    config: EventSourcingModuleAsyncConfig,
    databaseConnectionOptions: Omit<
      PostgresConnectionOptions,
      'schema' | 'entities'
    >,
  ): DynamicModule {
    const TYPE_ORM_EVENT_STORAGE_DATABASE_CONNECTION = Symbol(
      'TYPE_ORM_EVENT_STORAGE_DATABASE_CONNECTION',
    );
    return {
      module: EventSourcingModule,
      imports: config.imports || [],
      providers: [
        this.createAsyncProviders(config),
        {
          provide: TYPE_ORM_EVENT_STORAGE_DATABASE_CONNECTION,
          inject: [EVENT_SOURCING_CONFIG],
          useFactory: async (config: EventSourcingModuleConfig) =>
            await createConnection({
              ...databaseConnectionOptions,
              schema: config.eventStorageName || DEFAULT_EVENT_STORAGE_NAME,
              entities: [DomainEventEntity],
            }),
        },
        {
          provide: EVENT_STORAGE,
          inject: [
            EVENT_SOURCING_CONFIG,
            TYPE_ORM_EVENT_STORAGE_DATABASE_CONNECTION,
          ],
          useFactory: (
            config: EventSourcingModuleConfig,
            connection: Connection,
          ) =>
            new TypeOrmEventStorage(
              config.time,
              connection.getRepository<DomainEventEntity>(DomainEventEntity),
            ),
        },
      ],
      exports: [EVENT_STORAGE],
    };
  }

  static registerInMemoryAsync(
    config: EventSourcingModuleAsyncConfig,
  ): DynamicModule {
    return {
      module: EventSourcingModule,
      imports: config.imports || [],
      providers: [
        this.createAsyncProviders(config),
        {
          provide: EVENT_STORAGE,
          useFactory: (config: EventSourcingModuleConfig) =>
            new InMemoryEventStorage(config.time),
          inject: [EVENT_SOURCING_CONFIG],
        },
      ],
      exports: [EVENT_STORAGE],
    };
  }

  static registerEventStoreAsync(
    config: EventSourcingModuleAsyncConfig,
  ): DynamicModule {
    const eventStoreHttpModule = HttpModule.register({
      baseURL: process.env.EVENTSTORE_URL || 'http://127.0.0.1:2113',
      withCredentials: true,
      auth: {
        username: process.env.EVENTSTORE_USERNAME || 'admin',
        password: process.env.EVENTSTORE_PASSWORD || 'changeit',
      },
    });
    return {
      module: EventSourcingModule,
      imports: [...config.imports, eventStoreHttpModule] || [],
      providers: [
        this.createAsyncProviders(config),
        {
          provide: EVENT_STORAGE,
          useFactory: (
            config: EventSourcingModuleConfig,
            httpService: HttpService,
          ) => new EventStoreEventStorage(config.time, httpService),
          inject: [EVENT_SOURCING_CONFIG, HttpService],
        },
      ],
      exports: [EVENT_STORAGE],
    };
  }

  private static createAsyncProviders(
    config: EventSourcingModuleAsyncConfig,
  ): Provider {
    if (config) {
      if (config.useFactory) {
        return {
          provide: EVENT_SOURCING_CONFIG,
          useFactory: config.useFactory,
          inject: config.inject || [],
        };
      } else {
        return {
          provide: EVENT_SOURCING_CONFIG,
          useFactory: async (
            optionsFactory: EventSourcingModuleConfigFactory,
          ) => await optionsFactory.createModuleConfig(),
          inject: [config.useExisting || config.useClass],
        };
      }
    } else {
      return {
        provide: EVENT_SOURCING_CONFIG,
        useValue: {},
      };
    }
  }
}
