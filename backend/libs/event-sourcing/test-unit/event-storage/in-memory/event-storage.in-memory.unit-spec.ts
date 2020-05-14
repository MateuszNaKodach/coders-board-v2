import { InMemoryEventStorage } from '@coders-board-library/event-sourcing/event-storage/in-memory/event-storage.in-memory';
import { EventStorage } from '@coders-board-library/event-sourcing/api/event-storage';
import * as moment from 'moment';
import { EventStreamVersion } from '@coders-board-library/event-sourcing/api/event-stream-version.valueobject';
import { EventStreamId } from '@coders-board-library/event-sourcing/api/event-stream-id.valueboject';

const time = {
  15_00: moment.utc(new Date(2020, 4, 7, 15, 0)).toDate(),
  15_20: moment.utc(new Date(2020, 4, 7, 15, 20)).toDate(),
  15_30: moment.utc(new Date(2020, 4, 7, 15, 30)).toDate(),
  15_40: moment.utc(new Date(2020, 4, 7, 15, 40)).toDate(),
};

const events = {
  aggregate1: {
    id: 'aggregateId1',
    eventStreamId: EventStreamId.from('aggregateType1', 'aggregateId1'),
    event1: {
      eventId: 'eventId1.1',
      eventType: 'EVENT_TYPE_1',
      streamId: 'aggregateId1',
      streamGroup: 'aggregateType1',
      occurredAt: time['1530'],
      data: { value: 'value' },
    },
    event2: {
      eventId: 'eventId1.2',
      eventType: 'EVENT_TYPE_2',
      streamId: 'aggregateId1',
      streamGroup: 'aggregateType1',
      occurredAt: time['1540'],
      data: {},
    },
  },
  aggregate2: {
    id: 'aggregateId2',
    eventStreamId: EventStreamId.from('aggregateType2', 'aggregateId2'),
    event1: {
      eventId: 'eventId2.1',
      eventType: 'EVENT_TYPE_1',
      streamId: 'aggregateId2',
      streamGroup: 'aggregateType2',
      occurredAt: time['1530'],
      data: { value: 'value' },
    },
    event2: {
      eventId: 'eventId2.2',
      eventType: 'EVENT_TYPE_2',
      streamId: 'aggregateId2',
      streamGroup: 'aggregateType2',
      occurredAt: time['1540'],
      data: {},
    },
  },
};

describe('Feature: In memory event storage', () => {
  let currentDate: Date;
  let eventStorage: EventStorage;

  beforeEach(() => {
    eventStorage = new InMemoryEventStorage(() => currentDate);
  });

  describe('Given: Events to store', () => {
    describe('When: store the events', () => {
      beforeEach(() => {
        eventStorage.store(events.aggregate1.eventStreamId, events.aggregate1.event1);
        eventStorage.store(events.aggregate2.eventStreamId, events.aggregate2.event1);
        eventStorage.store(events.aggregate1.eventStreamId, events.aggregate1.event2);
        eventStorage.store(events.aggregate2.eventStreamId, events.aggregate2.event2);
      });

      it('Then: The event should be queryable by all event', async () => {
        currentDate = time['1540'];
        const stored = await eventStorage.readEvents(events.aggregate1.eventStreamId);
        expect(stored).toContain(events.aggregate1.event1);
        expect(stored).toContain(events.aggregate1.event2);
      });

      it('Then: The event should be queryable by time', async () => {
        expect(await eventStorage.readEvents(events.aggregate1.eventStreamId, time['1520'])).toStrictEqual([]);
        expect(await eventStorage.readEvents(events.aggregate1.eventStreamId, time['1530'])).toContain(
          events.aggregate1.event1,
        );

        expect(await eventStorage.readEvents(events.aggregate1.eventStreamId, time['1540'])).toContain(
          events.aggregate1.event1,
        );
        expect(await eventStorage.readEvents(events.aggregate1.eventStreamId, time['1540'])).toContain(
          events.aggregate1.event2,
        );
      });

      it('Then: The event cannot be stored twice', async () => {
        await expect(eventStorage.store(events.aggregate1.eventStreamId, events.aggregate1.event1)).rejects.toMatch(
          `Event stream already contains this event with id ${events.aggregate1.event1.eventId}!`,
        );
      });

      it('Then: The event cannot be stored if aggregate was modified', async () => {
        const anotherEvent2 = {
          eventId: 'eventId1.2_2',
          eventType: 'EVENT_TYPE_2',
          streamId: 'aggregateId1',
          streamGroup: 'aggregateType1',
          occurredAt: time['1540'],
          data: {},
        };
        await expect(
          eventStorage.store(events.aggregate1.eventStreamId, anotherEvent2, EventStreamVersion.exactly(1)),
        ).rejects.toMatch(`Event stream for aggregate was modified! Expected version: 1, but actual is: 2`);
      });
    });
  });
});
