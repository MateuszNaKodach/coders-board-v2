export class EventStreamVersion {
  private readonly TYPE = 'EventStreamVersion';

  constructor(readonly raw: number) {}

  static exactly(raw: number) {
    return new EventStreamVersion(raw);
  }

  isNew(): boolean {
    return this.raw === 0;
  }
}
