import { ProjectionsManager } from '../../projection/eventstore/projections-manager';
import { HttpService } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { ProjectionDetails } from '../../projection/eventstore/projection-details';
import { catchError, map } from 'rxjs/operators';

export class HttpProjectionsManager implements ProjectionsManager {
  constructor(private readonly httpService: HttpService) {}

  getAll(): Observable<ProjectionDetails[]> {
    return this.httpService
      .get<ProjectionDetails[]>('/projections/any')
      .pipe(map(response => response.data));
  }

  get(name: string): Observable<ProjectionDetails | undefined> {
    return this.httpService.get<ProjectionDetails>(`/projection/${name}`).pipe(
      map(response => response.data),
      catchError(err => {
        const projectionNotExists = err.response.status === 404;
        return projectionNotExists ? of(undefined) : throwError(err);
      }),
    );
  }

  getQuery(name: string): Observable<string | undefined> {
    return this.httpService.get<string>(`/projection/${name}/query`).pipe(
      map(response => response.data),
      catchError(err => {
        const projectionNotExists = err.response.status === 404;
        return projectionNotExists ? of(undefined) : throwError(err);
      }),
    );
  }

  updateQuery(name: string, query: string): Observable<boolean> {
    return this.httpService
      .put<string>(`/projection/${name}/query?type=JS`, query)
      .pipe(
        map(response => {
          const projectionUpdated = response.status === 200;
          return projectionUpdated;
        }),
      );
  }

  exists(name: string): Observable<boolean> {
    return this.get(name).pipe(
      map(projection => projection !== undefined),
      catchError(err => {
        const projectionNotExists = err.response.status === 404;
        return projectionNotExists ? of(false) : throwError(err);
      }),
    );
  }

  enable(name: string): Observable<void> {
    return this.httpService
      .post<void>(`/projection/${name}/command/enable`)
      .pipe(map(response => response.data));
  }

  create(name: string, query: string, mode: "continuous" | "onetime" = "continuous"): Observable<boolean> {
    return this.httpService
      .post<void>(
        `/projections/${mode}?name=${name}&type=JS&emit=true`,
        query,
      )
      .pipe(
        map(response => response.status === 201),
        catchError(err => {
          const isProjectionAlreadyExists = err.response.status === 409;
          return isProjectionAlreadyExists ? of(true) : throwError(err);
        }),
      );
  }

  getState<T>(name: string): Observable<T | undefined> {
    return this.httpService.get<T>(`/projection/${name}/state`).pipe(
      map(response => (response.status === 200 ? response.data : undefined)),
      catchError(() => of(undefined)),
    );
  }

  /**
   * retryWhen(
   this.rxJSUtilsService.genericRetryStrategy({
          numberOfAttempts: 3,
          delayTime: 200,
          ignoredErrorCodes: [500],
        }),
   )
   */
}
