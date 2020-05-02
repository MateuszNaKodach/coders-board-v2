import { Time } from './time.type';

export type EventSourcingModuleConfig = {
  eventStorageName?: string;
  time: Time;
};
