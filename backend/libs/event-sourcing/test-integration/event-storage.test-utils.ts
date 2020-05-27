import { EventStreamName } from '@coders-board-library/event-sourcing/api/event-stream-name.valueboject';
import { v4 as uuid } from 'uuid';
import { StorageEventEntry } from '@coders-board-library/event-sourcing/api/storage-event-entry';

export class TestEventStream {
  constructor(readonly name: EventStreamName) {}

  static withName(eventStreamName: EventStreamName) {
    return new TestEventStream(eventStreamName);
  }

  newSampleEvent(
    eventType: string | undefined = undefined,
    occurredAt: Date = new Date(),
    data: unknown = { value: 'value' },
  ): StorageEventEntry {
    return {
      eventId: uuid(),
      eventType: eventType || uuid(),
      streamId: this.name.streamId,
      streamGroup: this.name.streamGroup,
      occurredAt,
      data,
    };
  }
}
