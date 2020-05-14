import { ProjectionsManager } from './projections-manager';
import { flatMap, switchMap } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';
import { ProjectionName } from './projection-name';
import { ProjectionSource } from './projection-source';

export class ProjectionContext {
  constructor(private readonly projectionsManager: ProjectionsManager) {}

  async projectionResult<T>(name: ProjectionName): Promise<ProjectionState<T>> {
    return this.projectionsManager
      .getResult<ProjectionState<T>>(name.raw)
      .toPromise();
  }

  projectionResultObservable<T>(
    name: ProjectionName,
  ): Observable<ProjectionState<T>> {
    return this.projectionsManager.getResult<ProjectionState<T>>(name.raw);
  }

  async enableProjection(name: ProjectionName): Promise<void> {
    const isProjectionEnabled =
      (await this.projectionsManager.getAll().toPromise()).find(
        p => p.name == name.raw && p.status != 'Stopped',
      ) !== undefined;
    if (isProjectionEnabled) {
      return;
    }
    await this.projectionsManager.enable(name.raw).toPromise();
  }

  async ensureProjection(
    name: ProjectionName,
    source: ProjectionSource,
  ): Promise<void> {
    return this.projectionsManager
      .exists(name.raw)
      .pipe(
        flatMap(exists =>
          exists
            ? this.updateProjectionQuery(name, source.jsQuery)
            : this.addProjection(name, source),
        ),
        switchMap(() => EMPTY),
      )
      .toPromise();
  }

  private addProjection(
    name: ProjectionName,
    source: ProjectionSource,
  ): Observable<boolean> {
    return this.projectionsManager.create(
      name.raw,
      source.jsQuery,
      source.config.mode,
    );
  }

  private updateProjectionQuery(
    name: ProjectionName,
    query: string,
  ): Observable<boolean> {
    return this.projectionsManager
      .getQuery(name.raw)
      .pipe(
        flatMap(currentQuery =>
          currentQuery === query
            ? of(false)
            : this.projectionsManager.updateQuery(name.raw, query),
        ),
      );
  }
}
