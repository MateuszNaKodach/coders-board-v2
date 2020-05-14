import { DomainEvent } from './domain-event';
import { AbstractFailureDomainEvent } from './abstract-failure-domain-event';

export abstract class Result {
  static success(events: undefined | DomainEvent | DomainEvent[] = undefined): Result {
    return events === undefined
      ? Success.empty()
      : Array.isArray(events)
      ? Success.many(events)
      : Success.single(events);
  }

  static failure(event: AbstractFailureDomainEvent): Result {
    return new Failure(event);
  }

  abstract failureReason(): string | undefined;

  abstract get events(): DomainEvent[];

  isSuccess(): boolean {
    return this.failureReason() === undefined;
  }

  isFailure(): boolean {
    return !this.isSuccess();
  }
}

class Success extends Result {
  private readonly _events: DomainEvent[];

  private constructor(events: DomainEvent[]) {
    super();
    this._events = events;
  }

  static empty() {
    return new Success([]);
  }

  get events() {
    return [...this._events];
  }

  static many(events: DomainEvent[]) {
    return new Success([...events]);
  }

  static single(event: DomainEvent) {
    return new Success([event]);
  }

  failureReason(): undefined {
    return undefined;
  }
}

class Failure extends Result {
  private readonly reason: AbstractFailureDomainEvent;

  constructor(reason: AbstractFailureDomainEvent) {
    super();
    this.reason = reason;
  }

  failureReason(): string {
    return this.reason.data.reason;
  }

  get events() {
    return [this.reason];
  }
}
