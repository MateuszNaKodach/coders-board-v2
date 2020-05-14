import { ProjectionSources } from '../projection/projection-sources';
import * as fs from 'fs';
import { ProjectionName } from '../projection/projection-name';
import { ProjectionConfig, ProjectionSource } from '../projection/projection-source';

export class ResourcesProjectionSources implements ProjectionSources {
  constructor(private readonly projectionsDirectoryPath: string) {}

  projectionSource(name: ProjectionName): ProjectionSource {
    const projectionQuery = this.readProjectionQuery(name);
    const config = this.readProjectionConfig(name);
    return {
      jsQuery: projectionQuery,
      config: config,
    };
  }

  private readProjectionQuery(name: ProjectionName) {
    return fs.readFileSync(`${this.projectionsDirectoryPath}/${name.id}/v${name.version}/query.projection.js`, {
      encoding: 'utf-8',
    });
  }

  private readProjectionConfig(name: ProjectionName): ProjectionConfig {
    let configFileContent: string;
    try {
      configFileContent = fs.readFileSync(`${this.projectionsDirectoryPath}/${name.id}/v${name.version}/config.json`, {
        encoding: 'utf-8',
      });
    } catch (e) {
      configFileContent = undefined;
    }
    return configFileContent ? JSON.parse(configFileContent) : ProjectionConfig.default();
  }
}
