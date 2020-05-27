export interface SubscriptionInfo {
  eventStreamId: string;
  groupName: string;
  status: string;
  averageItemsPerSecond: number;
  totalItemsProcessed: number;
  countSinceLastMeasurement: number;
  lastProcessedEventNumber: number;
  lastKnownEventNumber: number;
  readBufferCount: number;
  liveBufferCount: number;
  retryBufferCount: number;
  totalInFlightMessages: number;
  connections: any[];
}
