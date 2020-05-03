export interface StorageEventEntry {
  readonly eventId: string;
  readonly eventType: string;
  readonly occurredAt: Date;
  readonly streamId: string;
  readonly streamGroup: string;
  readonly data: any;
}
