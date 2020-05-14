import { v4 as uuid } from 'uuid';

export class DomainEventId {
  private readonly TYPE = 'DomainEventId';

  private constructor(readonly raw: string) {}

  static generate() {
    return new DomainEventId(uuid());
  }

  static of(raw: string) {
    return new DomainEventId(raw);
  }
}
