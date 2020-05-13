import { DomainEvent } from './domain-event';
import { AggregateId } from './aggregate-id.valueobject';
import { TimeProviderPort } from './time-provider.port';
import { AggregateVersion } from './aggregate-version.valueobject';
import { Result } from './result';
import { AbstractFailureDomainEvent } from './abstract-failure-domain-event';

const INTERNAL_EVENTS = Symbol();

export abstract class AbstractAggregateRoot<I extends AggregateId> {
  protected id: I;
  private readonly [INTERNAL_EVENTS]: DomainEvent[] = [];
  private readonly timeProvider: TimeProviderPort;
  private _committedVersion = AggregateVersion.new();
  private _currentVersion = AggregateVersion.new();

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

  protected applyAll(events: DomainEvent[], isFromHistory = false) {
    events.forEach(event => this.apply(event, isFromHistory));
  }

  //TODO: Checking for aggregate currentVersion here! Because it can pass wrong command.
  executeCommand(executor: () => Result): Result {
    const result = executor();
    this.applyAll(result.events);
    return result;
  }

  protected apply(event: DomainEvent, isFromHistory = false) {
    if (!isFromHistory) {
      this[INTERNAL_EVENTS].push(event);
    }
    this._currentVersion = this._currentVersion.increase();
    if (isFromHistory) {
      this._committedVersion = this._committedVersion.increase();
    }
    const handler = this.getEventHandler(event);
    if (!handler && !(event instanceof AbstractFailureDomainEvent)) {
      throw new Error(`Handler for domain event ${event.eventType} not found!`);
    }
    if (handler) {
      handler.call(this, event);
    }
  }

  private getEventHandler(event: DomainEvent): Function | undefined {
    const handler = `on${this.getEventName(event)}`;
    return this[handler];
  }

  protected getEventName(event): string {
    const { constructor } = Object.getPrototypeOf(event);
    return constructor.name as string;
  }

  get aggregateId() {
    return this.id;
  }

  get committedVersion() {
    return this._committedVersion;
  }

  get currentVersion() {
    return this._currentVersion;
  }
}
