import { ProjectionContext } from '@coders-board-library/eventstore-projections/projection/projection-context';
import { ProjectionName } from '@coders-board-library/eventstore-projections/projection/projection-name';
import { Observable } from 'rxjs';

export class EventStoreProjectionStateProvider {
  constructor(private readonly projectionContext: ProjectionContext) {}

  async projectionState<T>(name: ProjectionName): Promise<ProjectionState<T>> {
    return this.projectionContext.projectionState<T>(name);
  }

  projectionStateObservable<T>(
    name: ProjectionName,
  ): Observable<ProjectionState<T>> {
    return this.projectionContext.projectionStateObservable<T>(name);
  }
}
