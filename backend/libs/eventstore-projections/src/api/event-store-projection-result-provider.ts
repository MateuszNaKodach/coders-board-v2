import { ProjectionContext } from '@coders-board-library/eventstore-projections/projection/projection-context';
import { ProjectionName } from '@coders-board-library/eventstore-projections/projection/projection-name';
import { Observable } from 'rxjs';

export class EventStoreProjectionResultProvider {
  constructor(private readonly projectionContext: ProjectionContext) {}

  async projectionResult<T>(name: ProjectionName): Promise<ProjectionState<T>> {
    return this.projectionContext.projectionResult<T>(name);
  }

  projectionResultObservable<T>(name: ProjectionName): Observable<ProjectionState<T>> {
    return this.projectionContext.projectionResultObservable<T>(name);
  }
}
