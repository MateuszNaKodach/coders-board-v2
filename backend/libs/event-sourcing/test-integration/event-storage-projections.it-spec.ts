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

const EVENTS_IN_STREAM = 100;
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

      describe(`Given: Events stored in a stream`, () => {
        const eventStream = TestEventStream.withName(
          EventStreamName.from(`TestStream+${time().toISOString().split('-').join('')}`, uuid()),
        );
        const eventsFrom0to99 = range(0, EVENTS_IN_STREAM).map(it =>
          eventStream.newSampleEvent('TestEvent', moment(time()).add(it, 'ms').toDate()),
        );
        const eventsFrom100to199 = range(0, EVENTS_IN_STREAM).map(it =>
          eventStream.newSampleEvent('TestEvent', moment(time()).add(it, 'ms').toDate()),
        );
        const eventsFrom200to299 = range(0, EVENTS_IN_STREAM).map(it =>
          eventStream.newSampleEvent('TestEvent', moment(time()).add(it, 'ms').toDate()),
        );

        beforeAll(async done => {
          await eventStorage.storeAll(eventStream.name, eventsFrom0to99, EventStreamVersion.newStream());
          await eventStorage.storeAll(eventStream.name, eventsFrom100to199, EventStreamVersion.exactly(100));
          await eventStorage.storeAll(eventStream.name, eventsFrom200to299, EventStreamVersion.exactly(200));
          done();
        });

        describe(`When: subscribe for two events from the stream`, () => {
          let subscriptionName: string;
          let firstSubscriptionEvent: StorageEventEntry;
          let secondSubscriptionEvent: StorageEventEntry;

          beforeAll(async done => {
            subscriptionName = uuid();
            firstSubscriptionEvent = await eventStorageSubscriptions
              .observeFor(eventStream.name, subscriptionName)
              .toPromise();
            secondSubscriptionEvent = await eventStorageSubscriptions
              .observeFor(eventStream.name, subscriptionName)
              .toPromise();
            done();
          });

          it(`Then: first received event should be the same as first saved in the stream`, async done => {
            expect(firstSubscriptionEvent).toStrictEqual(eventsFrom0to99[0]);
            done();
          });

          it(`Then: second received event should be the same as second saved in the stream`, async done => {
            expect(secondSubscriptionEvent).toStrictEqual(eventsFrom0to99[1]);
            done();
          });
        });

        describe(`When: subscribe for all events`, () => {
          let subscriptionName: string;
          let receivedEvents: StorageEventEntry[];

          beforeAll(async done => {
            subscriptionName = uuid();
            receivedEvents = await Promise.all(
              range(0, EVENTS_IN_STREAM).map(() =>
                eventStorageSubscriptions.observeFor(eventStream.name, subscriptionName).toPromise(),
              ),
            );
            done();
          });

          it(`Then: received events should match stored in the stream`, async done => {
            receivedEvents.forEach(it => expect(eventsFrom0to99).toContainEqual(it));
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
