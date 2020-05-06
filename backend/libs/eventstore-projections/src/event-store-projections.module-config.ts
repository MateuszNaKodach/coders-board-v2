import { ProjectionName } from './projection/projection-name';

export const PROJECTIONS = Symbol('PROJECTIONS');

export type EventStoreConfig = {
  baseURL: string;
  auth: {
    username: string;
    password: string;
  };
};

export type EventStoreProjectionsModuleConfig = {
  eventStore: EventStoreConfig;
  projectionsDir: string;
  projections: ProjectionName[];
};
