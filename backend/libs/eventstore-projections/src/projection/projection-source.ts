export interface ProjectionSource {
  jsQuery: string;
  config: ProjectionConfig;
}

export class ProjectionConfig {
  mode: ProjectionMode;

  private constructor(mode: ProjectionMode) {
    this.mode = mode;
  }

  static default() {
    return new ProjectionConfig(ProjectionMode.CONTINUOUS);
  }
}

export enum ProjectionMode {
  CONTINUOUS = 'continuous',
  ONE_TIME = 'onetime',
}
