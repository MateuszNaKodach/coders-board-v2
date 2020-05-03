export interface PublicEvent<P extends any = any> {
  readonly eventId: string;
  readonly occurredAt: Date;
  readonly eventType: string;
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly data: P;
} //TODO: Remaster interface. Consider delete aggregate concept? What about read models in this case? Add source - module / BC?

export abstract class AbstractPublicEvent<P extends any = any>
  implements PublicEvent<P> {
  protected constructor(
    readonly eventId: string,
    readonly occurredAt: Date,
    readonly aggregateId: string,
    readonly data: P,
  ) {}

  get eventType(): string {
    return Object.getPrototypeOf(this).constructor.name;
  }

  abstract get aggregateType(): string;
}
