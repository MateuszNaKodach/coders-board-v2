import { TypeOrmModule } from '@nestjs/typeorm';
import { Time } from './time.type';

export type EventSourcingModuleConfig =
  | {
      time: Time;
      eventStorage: 'in-memory';
    }
  | {
      time: Time;
      eventStorage: 'typeorm';
      typeOrmModule: TypeOrmModule;
    };
