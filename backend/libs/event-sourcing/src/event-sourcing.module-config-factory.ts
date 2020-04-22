import { EventSourcingModuleConfig } from '@coders-board-library/event-sourcing/event-sourcing.module-config';

export interface EventSourcingModuleConfigFactory {
  createModuleConfig():
    | Promise<EventSourcingModuleConfig>
    | EventSourcingModuleConfig;
}
