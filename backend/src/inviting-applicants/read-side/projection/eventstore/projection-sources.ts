export const PROJECTION_SOURCES_PROVIDER = Symbol("PROJECTION_SOURCES_PROVIDER");

export interface ProjectionSources {
  projectionQuerySource(name: string): string;
}
