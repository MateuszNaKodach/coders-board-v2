import { AbstractPublicEvent, PublicEvent } from '@coders-board-library/public-messages';
import SpyInstance = jest.SpyInstance;
import DoneCallback = jest.DoneCallback;

interface Type<T> extends Function {
  new (...args: any[]): T;
}

export type EventPublisherSpy = SpyInstance<void, [any]>;

export function expectLastPublishedEvent<T extends PublicEvent>(
  eventBusSpy: EventPublisherSpy,
  expected: ExpectedPublishEvent<T>,
) {
  const publishedEvent = eventBusSpy.mock.calls.pop()[0];
  expectEvent(publishedEvent, expected);
}

export function expectLastPublishedEventAsync<T extends PublicEvent>(
  eventBusSpy: EventPublisherSpy,
  expected: ExpectedPublishEvent<T>,
  done: DoneCallback,
  timeout: number | undefined = 5,
) {
  setTimeout(() => {
    expectLastPublishedEvent(eventBusSpy, expected);
    done();
  }, timeout);
}

export type ExpectedPublishEvent<T extends PublicEvent> = {
  type: Type<T>;
  data: T['data'];
};

export function expectEvent<T extends PublicEvent>(
  actual: unknown,
  expected: ExpectedPublishEvent<T>,
) {
  if (isPublicEvent(actual)) {
    expect(actual).toBeInstanceOf(expected.type);
    expect(actual.data).toStrictEqual(expected.data);
  } else {
    throw new Error('Event is not public event!');
  }
}

export function isDefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}

export function isPublicEvent(event: unknown | undefined): event is PublicEvent {
  return isDefined(event) && event instanceof AbstractPublicEvent;
}
