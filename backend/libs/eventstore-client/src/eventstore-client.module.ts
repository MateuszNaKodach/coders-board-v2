import { Module } from '@nestjs/common';
import { EventStoreClient } from './eventstore-client.service';

@Module({
  providers: [EventStoreClient],
  exports: [EventStoreClient],
})
export class EventStoreClientModule {}
