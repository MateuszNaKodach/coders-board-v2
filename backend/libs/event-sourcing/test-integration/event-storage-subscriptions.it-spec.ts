import { EVENT_STORAGE, EventStorage } from '@coders-board-library/event-sourcing/api/event-storage';
import { Test, TestingModule } from '@nestjs/testing';
import { EventSourcingModule } from '@coders-board-library/event-sourcing';
import {
  EVENT_STORAGE_SUBSCRIPTIONS,
  EventStorageSubscriptions,
} from '@coders-board-library/event-sourcing/api/event-storage-subscriptions';
import { TestEventStream } from './event-storage.test-utils';
import { v4 as uuid } from 'uuid';
import moment = require('moment');
import { EventStreamVersion } from '@coders-board-library/event-sourcing/api/event-stream-version.valueobject';
import { EventStreamName } from '@coders-board-library/event-sourcing/api/event-stream-name.valueboject';
import { StorageEventEntry } from '@coders-board-library/event-sourcing/api/storage-event-entry';
import { Observable } from 'rxjs';

const EVENTS_IN_BATCH = 2;
describe('Feature: Event Storage Subscriptions', () => {
  let eventStorage: EventStorage;
  let eventStorageSubscriptions: EventStorageSubscriptions;
  const time = () => new Date();

  const eventSourcingModuleConfig = {
    useFactory: () => {
      return { time };
    },
  };

  [
    // { name: 'TypeORM', impl: EventSourcingModule.registerTypeOrmAsync(eventSourcingModuleConfig) },
    { name: 'EventStorage', impl: EventSourcingModule.registerEventStoreAsync(eventSourcingModuleConfig) },
    // { name: 'in memory', impl: EventSourcingModule.registerInMemoryAsync(eventSourcingModuleConfig) },
  ].forEach(testCase => {
    describe(`Scenario: Event Store - ${testCase.name} implementation`, () => {
      beforeAll(async () => {
        const app: TestingModule = await Test.createTestingModule({
          imports: [testCase.impl],
        }).compile();
        await app.init();
        eventStorage = app.get<EventStorage>(EVENT_STORAGE);
        eventStorageSubscriptions = app.get<EventStorageSubscriptions>(EVENT_STORAGE_SUBSCRIPTIONS);
      });

      describe(`Given: ${3 * EVENTS_IN_BATCH}Events stored in a stream`, () => {
        const eventStream = TestEventStream.withName(
          EventStreamName.from(`TestStream+${time().toISOString().split('-').join('')}`, uuid()),
        );
        const eventsBatch0 = range(0, EVENTS_IN_BATCH).map(it =>
          eventStream.newSampleEvent('TestEvent', moment(time()).add(it, 'ms').toDate()),
        );
        const eventsBatch1 = range(0, EVENTS_IN_BATCH).map(it =>
          eventStream.newSampleEvent('TestEvent', moment(time()).add(it, 'ms').toDate()),
        );
        const eventsBatch2 = range(0, EVENTS_IN_BATCH).map(it =>
          eventStream.newSampleEvent('TestEvent', moment(time()).add(it, 'ms').toDate()),
        );
        const allEvents = [...eventsBatch0, ...eventsBatch1, ...eventsBatch2];

        beforeAll(async done => {
          await eventStorage.storeAll(eventStream.name, eventsBatch0, EventStreamVersion.newStream());
          await eventStorage.storeAll(eventStream.name, eventsBatch1, EventStreamVersion.exactly(EVENTS_IN_BATCH));
          await eventStorage.storeAll(eventStream.name, eventsBatch2, EventStreamVersion.exactly(2 * EVENTS_IN_BATCH));
          done();
        });

        const LOAD_EVENTS_IN_TEST = EVENTS_IN_BATCH / 2;

        describe(`When: subscribe for half of events from the stream`, () => {
          let subscriptionName: string;
          let receivedEventsFirstHalf: StorageEventEntry[];
          let receivedEventsSecondHalf: StorageEventEntry[];

          beforeAll(async done => {
            subscriptionName = uuid();
            receivedEventsFirstHalf = await allEventsFrom(
              eventStorageSubscriptions.observeForBatch(eventStream.name, subscriptionName, LOAD_EVENTS_IN_TEST),
            );
            receivedEventsSecondHalf = await allEventsFrom(
              eventStorageSubscriptions.observeForBatch(eventStream.name, subscriptionName, LOAD_EVENTS_IN_TEST),
            );
            done();
          });

          it(`Then: first half received event should be the same as first half saved in the stream`, async done => {
            receivedEventsFirstHalf.forEach((it, index) => expect(allEvents[index]).toStrictEqual(it));
            done();
          });

          describe(`And: subscribe as the same subscription for second half of more events`, () => {
            it(`Then: second half of received events should be the same as second half of saved in the stream`, async done => {
              receivedEventsSecondHalf.forEach((it, index) =>
                expect(allEvents[LOAD_EVENTS_IN_TEST + index]).toStrictEqual(it),
              );
              done();
            });
          });
        });

        describe(`When: subscribe for all events`, () => {
          let subscriptionName: string;
          let receivedEventsBatch0: StorageEventEntry[];
          let receivedEventsBatch1: StorageEventEntry[];
          let receivedEventsBatch2: StorageEventEntry[];

          beforeAll(async done => {
            subscriptionName = uuid();
            receivedEventsBatch0 = await allEventsFrom(
              eventStorageSubscriptions.observeForBatch(eventStream.name, subscriptionName, EVENTS_IN_BATCH),
            );
            receivedEventsBatch1 = await allEventsFrom(
              eventStorageSubscriptions.observeForBatch(eventStream.name, subscriptionName, EVENTS_IN_BATCH),
            );
            receivedEventsBatch2 = await allEventsFrom(
              eventStorageSubscriptions.observeForBatch(eventStream.name, subscriptionName, EVENTS_IN_BATCH),
            );
            done();
          });

          it(`Then: received events should match stored in the stream in the same order`, async done => {
            receivedEventsBatch0.forEach((it, index) => expect(eventsBatch0[index]).toStrictEqual(it));
            receivedEventsBatch1.forEach((it, index) => expect(eventsBatch1[index]).toStrictEqual(it));
            receivedEventsBatch2.forEach((it, index) => expect(eventsBatch2[index]).toStrictEqual(it));
            done();
          });
        });
      });
    });
  });
});

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start }, (v, k) => k + start);
}

async function allEventsFrom(observable: Observable<StorageEventEntry>): Promise<StorageEventEntry[]> {
  const events = [];
  await observable.forEach(event => events.push(event));
  return events;
}
