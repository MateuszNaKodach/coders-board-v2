import {
  EVENT_STREAM_GROUP_SEPARATOR,
  EventStreamId,
} from '@coders-board-library/event-sourcing/api/event-stream-id.valueboject';

describe('Feature: EventStreamId', () => {
  it('EventStreamId should contains group and id', () => {
    const streamGroup = 'streamGroup';
    const streamId = 'StreamId-From-Multiple-Segments';

    const eventStreamId = EventStreamId.from(streamGroup, streamId);

    expect(eventStreamId.streamGroup).toEqual(streamGroup);
    expect(eventStreamId.streamId).toEqual(streamId);
  });

  it(`EventStreamId should parse first segment divided by ${EVENT_STREAM_GROUP_SEPARATOR} of raw value as stream group`, () => {
    const streamGroup = 'streamGroup';
    const streamId = 'StreamId-From-Multiple-Segments';

    const eventStreamId = EventStreamId.fromRaw(
      streamGroup + EVENT_STREAM_GROUP_SEPARATOR + streamId,
    );

    expect(eventStreamId.streamGroup).toEqual(streamGroup);
    expect(eventStreamId.streamId).toEqual(streamId);
  });
});
