export interface ProjectionDetails {
  coreProcessingTime: number;
  version: number;
  epoch: number;
  effectiveName: string;
  writesInProgress: number;
  readsInProgress: number;
  partitionsCached: number;
  status: string;
  stateReason: string;
  name: string;
  mode: string;
  position: string;
  progress: number;
  lastCheckpoint: string;
  eventsProcessedAfterRestart: number;
  statusUrl: string;
  stateUrl: string;
  resultUrl: string;
  queryUrl: string;
  enableCommandUrl: string;
  disableCommandUrl: string;
  checkpointStatus: string;
  bufferedEvents: number;
  writePendingEventsBeforeCheckpoint: number;
  writePendingEventsAfterCheckpoint: number;
}