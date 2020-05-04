import { PublicEvent } from '@coders-board-library/public-messages';

export const EXTERNAL_EVENT_PUBLISHER = Symbol('EXTERNAL_EVENT_PUBLISHER');

export interface ExternalEventPublisher {
  publish<T extends PublicEvent>(event: T): void;
  publishAll(events: PublicEvent[]): void;
}
