import {ProjectionsManager} from "./projections-manager";
import {flatMap, switchMap} from "rxjs/operators";
import {EMPTY, Observable, of} from "rxjs";

export class ProjectionContext {

  constructor(private readonly projectionsManager: ProjectionsManager) {
  }

  async projectionState<T>(name: string): Promise<T> {
    return this.projectionsManager.getState<T>(name)
        .toPromise();
  }

  async enableProjection(name: string): Promise<void> {
    const isProjectionEnabled = (await this.projectionsManager.getAll().toPromise())
        .find(p => p.name == name && p.status != "Stopped") !== undefined;
    if (isProjectionEnabled) {
      return;
    }
    await this.projectionsManager.enable(name).toPromise();
  }

  async ensureProjection(name: string, source: string): Promise<void> {
    return this.projectionsManager.exists(name)
        .pipe(
            flatMap(exists => exists ? this.updateProjection(name, source) : this.addProjection(name, source)),
            switchMap(() => EMPTY)
        ).toPromise();
  }

  private addProjection(name: string, query: string): Observable<boolean> {
    return this.projectionsManager.createContinuous(name, query);
  }

  private updateProjection(name: string, query: string): Observable<boolean> {
    return this.projectionsManager.getQuery(name)
        .pipe(
            flatMap(currentQuery => currentQuery === query ? of(false) : this.projectionsManager.updateQuery(name, query))
        )
  }

}