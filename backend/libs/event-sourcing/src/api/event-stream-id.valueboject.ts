const EVENT_STREAM_ID_PARTS_SEPARATOR = '_';

export class EventStreamId {
  private constructor(
    readonly aggregateType: string,
    readonly aggregateId: string,
  ) {}

  static from(aggregateType: string, aggregateId: string) {
    return new EventStreamId(aggregateType, aggregateId);
  }

  static fromRaw(raw: string) {
    const eventStreamIdParts = raw.split(EVENT_STREAM_ID_PARTS_SEPARATOR);
    if (eventStreamIdParts.length < 2) {
      throw new Error('Invalid eventStreamId format: ' + raw);
    }
    return new EventStreamId(eventStreamIdParts[0], eventStreamIdParts[1]);
  }

  static props(props: { aggregateType: string; aggregateId: string }) {
    return new EventStreamId(props.aggregateType, props.aggregateId);
  }

  get raw() {
    return `${this.aggregateType}${EVENT_STREAM_ID_PARTS_SEPARATOR}${this.aggregateId}`;
  }
}
