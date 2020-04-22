import { DynamicModule, Module, Provider } from '@nestjs/common';
import { EVENT_STORAGE, EventStorage } from './event-storage/event-storage';
import { TypeOrmEventStorage } from './event-storage/typeorm/event-storage.typeorm';
import { InMemoryEventStorage } from './event-storage/in-memory/event-storage.in-memory';
import { DomainEventEntity } from './event-storage/typeorm/event.typeorm-entity';
import { EventSourcingModuleConfig } from './event-sourcing.module-config';
import { Repository } from 'typeorm';
import { EventSourcingModuleAsyncConfig } from '@coders-board-library/event-sourcing/event-sourcing.module-async-config';
import { Time } from '@coders-board-library/event-sourcing/time.type';
import { EventSourcingModuleConfigFactory } from '@coders-board-library/event-sourcing/event-sourcing.module-config-factory';

const EVENT_SOURCING_CONFIG = Symbol();

@Module({})
export class EventSourcingModule {
  static register(config: EventSourcingModuleConfig): DynamicModule {
    const configProvider: Provider = {
      provide: EVENT_SOURCING_CONFIG,
      useValue: config,
    };
    if (config.eventStorage === 'typeorm') {
      const optionalImports = [];
      optionalImports.push(config.typeOrmModule);
      return {
        module: EventSourcingModule,
        imports: [...optionalImports],
        providers: [
          {
            provide: EVENT_STORAGE,
            useFactory: (typeOrmRepository: Repository<DomainEventEntity>) =>
              new TypeOrmEventStorage(config.time, typeOrmRepository),
          },
        ],
        exports: [EVENT_STORAGE],
      };
    }

    return {
      module: EventSourcingModule,
      providers: [
        configProvider,
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

  static registerAsync(config: EventSourcingModuleAsyncConfig): DynamicModule {
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
