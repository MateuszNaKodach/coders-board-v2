import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { EventSourcingModuleConfigFactory } from '@coders-board-library/event-sourcing/event-sourcing.module-config-factory';
import { EventSourcingModuleConfig } from '@coders-board-library/event-sourcing/event-sourcing.module-config';

export interface EventSourcingModuleAsyncConfig extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<EventSourcingModuleConfigFactory>;
  useClass?: Type<EventSourcingModuleConfigFactory>;
  useFactory?: (...args: any[]) => Promise<EventSourcingModuleConfig> | EventSourcingModuleConfig;
}
