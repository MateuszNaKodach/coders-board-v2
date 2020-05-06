import { ExternalEventPublisher } from '../../application/external-event-publisher/external-event-publisher';
import { PublicEvent } from '@coders-board-library/public-messages';

export class LoggingExternalEventPublisher implements ExternalEventPublisher {
  constructor(private readonly delegate: ExternalEventPublisher) {}

  publish<T extends PublicEvent>(event: T) {
    console.log('PUBLISHING PUBLIC EVENT \n ', event);
    return this.delegate.publish(event);
  }

  publishAll(events: PublicEvent[]) {
    console.log('PUBLISHING PUBLIC EVENTS \n ', events);
    return this.delegate.publishAll(events);
  }
}
