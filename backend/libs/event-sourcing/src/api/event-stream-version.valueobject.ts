export class EventStreamVersion {
  private readonly TYPE = 'EventStreamVersion';

  constructor(readonly raw: number) {}

  static exactly(raw: number) {
    return new EventStreamVersion(raw);
  }

  static newStream() {
    return new EventStreamVersion(0);
  }

  isNew(): boolean {
    return this.raw === 0;
  }
}
