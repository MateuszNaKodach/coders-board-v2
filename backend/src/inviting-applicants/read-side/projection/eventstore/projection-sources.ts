import {ProjectionName} from "./projection-name";
import {ProjectionSource} from "./projection-source";

export const PROJECTION_SOURCES_PROVIDER = Symbol(
  'PROJECTION_SOURCES_PROVIDER',
);

export interface ProjectionSources {
  projectionSource(name: ProjectionName): ProjectionSource;
}
