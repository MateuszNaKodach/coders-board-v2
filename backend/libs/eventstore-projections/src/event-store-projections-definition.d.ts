declare type RecordedEvent = {
  body: any;
  isJson: boolean;
  data: any;
  bodyRaw: string;
  eventType: string;
  streamId: string;
  sequenceNumber: 0;
  metadata: any;
  metadataRaw: string;
  linkMetadataRaw: string;
  partition: string;
  metadata_: string;
};

declare type HandlerFunction = (state: ProjectionState, event: RecordedEvent) => ProjectionState;

declare type Handlers = {
  $init?: () => ProjectionState;
  $any?: HandlerFunction;
  $deleted?: HandlerFunction;
  [eventName: string]: HandlerFunction;
};

type ProcessedEventsCount = { [key: string]: number };

declare type ProjectionState<ContentType = any> = {
  content: ContentType;
  metadata: {
    lastUpdated: Date;
    processedEventsCount: ProcessedEventsCount;
  };
};

interface WhenFilter {
  /**
   * Allows only the given events of a particular type to pass through the projection.
   * @param handlers handlers
   * @example
   ```typescript
   fromStream('account-1')
   .when({
  $init:() => {
    return { count: 0 }
  },
  myEventType: (state, event) => {
    state.count += 1; 
  }
})
   ```
   */
  when(handlers: Handlers): TransformByTransformation;
}

interface TransformByTransformation {
  /**
   * Allows transform projection state for different result.
   * @param state projection state after handlers
   * @example
   ```typescript
   fromStream('account-1')
   .when({
  $any: (state, event) => {
    state += state;
  }
})
   .transformBy((state) => {
  state = 'Transformed!';
})
   ```
   */
  transformBy(state: ProjectionState): ProjectionState;
}

interface PartitionByFilter {
  partitionBy();
}

/**
 * Selects events from a single stream.
 * @param streamId Unique identifier of the stream
 */
declare function fromStream(streamId: string): WhenFilter & PartitionByFilter & TransformByTransformation;

declare function fromAll(): WhenFilter & PartitionByFilter & TransformByTransformation;

declare function fromCategory(streamId: string): WhenFilter & PartitionByFilter & TransformByTransformation;
