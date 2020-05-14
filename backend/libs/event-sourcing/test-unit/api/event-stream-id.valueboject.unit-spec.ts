import {
  EVENT_STREAM_GROUP_SEPARATOR,
  EventStreamName,
} from '@coders-board-library/event-sourcing/api/event-stream-name.valueboject';

describe('Feature: EventStreamName', () => {
  it('EventStreamName should contains group and id', () => {
    const streamGroup = 'streamGroup';
    const streamId = 'StreamId-From-Multiple-Segments';

    const eventStreamName = EventStreamName.from(streamGroup, streamId);

    expect(eventStreamName.streamGroup).toEqual(streamGroup);
    expect(eventStreamName.streamId).toEqual(streamId);
  });

  it(`EventStreamName should parse first segment divided by ${EVENT_STREAM_GROUP_SEPARATOR} of raw value as stream group`, () => {
    const streamGroup = 'streamGroup';
    const streamId = 'StreamId-From-Multiple-Segments';

    const eventStreamName = EventStreamName.fromRaw(streamGroup + EVENT_STREAM_GROUP_SEPARATOR + streamId);

    expect(eventStreamName.streamGroup).toEqual(streamGroup);
    expect(eventStreamName.streamId).toEqual(streamId);
  });
});
