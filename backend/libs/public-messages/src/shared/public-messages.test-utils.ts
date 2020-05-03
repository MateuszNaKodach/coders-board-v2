import {
  AbstractPublicEvent,
  PublicEvent,
} from '@coders-board-library/public-messages';
import SpyInstance = jest.SpyInstance;

interface Type<T> extends Function {
  new (...args: any[]): T;
}

export type EventPublisherSpy = SpyInstance<void, [any]>;

export function expectOnlyPublishedEvent<T extends PublicEvent>(
  eventBusSpy: EventPublisherSpy,
  expected: ExpectedPublishEvent<T>,
) {
  let publishedEvent;
  //FIXME: Hack, but something is wrong with events publishing.
  // ApplicantInvited domain events comes with wrong property types (not value objects, but plain strings) to event propagator
  do {
    publishedEvent = eventBusSpy.mock.calls.pop()[0];
  } while (publishedEvent.eventId === undefined);
  return expectEvent(publishedEvent, expected);
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

export function isPublicEvent(
  event: unknown | undefined,
): event is PublicEvent {
  return isDefined(event) && event instanceof AbstractPublicEvent;
}
