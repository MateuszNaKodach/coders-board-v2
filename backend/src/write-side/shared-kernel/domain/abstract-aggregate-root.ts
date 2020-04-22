import { DomainEvent } from './domain-event';
import { AggregateId } from './aggregate-id.valueobject';
import { TimeProviderPort } from './time-provider.port';

const INTERNAL_EVENTS = Symbol();

export abstract class AbstractAggregateRoot<I extends AggregateId> {
  protected id: I;
  private readonly [INTERNAL_EVENTS]: DomainEvent[] = [];
  private readonly timeProvider: TimeProviderPort;

  protected constructor(timeProvider: TimeProviderPort) {
    this.timeProvider = timeProvider;
  }

  protected get currentDate() {
    return this.timeProvider.currentDate();
  }

  getUncommittedEvents(): DomainEvent[] {
    return this[INTERNAL_EVENTS];
  }

  clearUncommittedEvents() {
    this[INTERNAL_EVENTS].length = 0;
  }

  loadFromHistory(history: DomainEvent[]) {
    history.forEach(event => this.apply(event, true));
  }

  protected apply(event: DomainEvent, isFromHistory = false) {
    if (!isFromHistory) {
      this[INTERNAL_EVENTS].push(event);
    }
    const handler = this.getEventHandler(event);
    if (!handler) {
      throw new Error(`Handler for domain event ${event.eventType} not found!`);
    }
    handler.call(this, event);
  }

  private getEventHandler(event: DomainEvent): Function | undefined {
    const handler = `on${this.getEventName(event)}`;
    return this[handler];
  }

  protected getEventName(event): string {
    const { constructor } = Object.getPrototypeOf(event);
    return constructor.name as string;
  }
}
