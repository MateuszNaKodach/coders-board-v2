import { DomainEventPublisher } from './domain-event-publisher';
import { DomainEvent } from '../../domain/domain-event';

export class LoggingDomainEventPublisher implements DomainEventPublisher {
  constructor(private readonly delegate: DomainEventPublisher) {}

  publish<T extends DomainEvent>(event: T) {
    //console.log('PUBLISHING DOMAIN EVENT \n ', event);
    return this.delegate.publish(event);
  }

  publishAll(events: DomainEvent[]) {
    //console.log('PUBLISHING DOMAIN EVENTS \n ', events);
    return this.delegate.publishAll(events);
  }
}
