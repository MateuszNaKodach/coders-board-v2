import { Observable } from 'rxjs';
import { ProjectionDetails } from './projection-details';

export const PROJECTIONS_MANAGER = Symbol('PROJECTIONS_MANAGER');

export interface ProjectionsManager {
  getAll(): Observable<ProjectionDetails[]>;

  get(name: string): Observable<ProjectionDetails | undefined>;

  getQuery(name: string): Observable<string | undefined>;

  updateQuery(name: string, query: string): Observable<boolean>;

  exists(name: string): Observable<boolean>;

  enable(name: string): Observable<void>;

  create(
    name: string,
    query: string,
    mode: 'continuous' | 'onetime',
  ): Observable<boolean>;

  getState<T>(name: string): Observable<T | undefined>;
}
