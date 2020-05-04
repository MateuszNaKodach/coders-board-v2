import uuid = require('uuid');

export class DomainEventId {
  private readonly TYPE = 'DomainEventId';

  private constructor(readonly raw: string) {}

  static generate() {
    return new DomainEventId(uuid.v4());
  }

  static of(raw: string) {
    return new DomainEventId(raw);
  }
}
