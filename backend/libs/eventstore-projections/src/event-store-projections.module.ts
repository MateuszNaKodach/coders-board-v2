import {
  DynamicModule,
  HttpModule,
  HttpService,
  Inject,
  Module,
  OnModuleInit,
} from '@nestjs/common';
import {
  PROJECTION_SOURCES_PROVIDER,
  ProjectionSources,
} from './projection/projection-sources';
import { ResourcesProjectionSources } from '@coders-board-library/eventstore-projections/infrastructure/resources-projection-sources';
import { HttpProjectionsManager } from '@coders-board-library/eventstore-projections/infrastructure/http-projections-manager';
import { ProjectionContext } from './projection/projection-context';
import { ProjectionName } from './projection/projection-name';
import {
  PROJECTIONS_MANAGER,
  ProjectionsManager,
} from './projection/projections-manager';
import {
  EventStoreProjectionsModuleConfig,
  PROJECTIONS,
} from './event-store-projections.module-config';
import { EventStoreProjectionStateProvider } from '@coders-board-library/eventstore-projections/api/event-store-projection-state-provider';

const PROJECTIONS_DIR = Symbol('PROJECTIONS_DIR');

@Module({
  imports: [],
  providers: [
    {
      inject: [PROJECTIONS_DIR],
      useFactory: (projectionsDir: string) =>
        new ResourcesProjectionSources(projectionsDir),
      provide: PROJECTION_SOURCES_PROVIDER,
    },
    {
      inject: [HttpService],
      useFactory: (httpService: HttpService) => {
        return new HttpProjectionsManager(httpService);
      },
      provide: PROJECTIONS_MANAGER,
    },
    {
      inject: [PROJECTIONS_MANAGER],
      useFactory: (projectionsManager: ProjectionsManager) => {
        return new ProjectionContext(projectionsManager);
      },
      provide: ProjectionContext,
    },
    {
      inject: [ProjectionContext],
      useFactory: (projectionContext: ProjectionContext) => {
        return new EventStoreProjectionStateProvider(projectionContext);
      },
      provide: EventStoreProjectionStateProvider,
    },
  ],
})
export class EventStoreProjectionsModule implements OnModuleInit {
  static register(config: EventStoreProjectionsModuleConfig): DynamicModule {
    const projections = {
      provide: PROJECTIONS,
      useValue: config.projections,
    };
    const projectionsDir = {
      provide: PROJECTIONS_DIR,
      useValue: config.projectionsDir,
    };
    const eventStoreHttpModule = HttpModule.register({
      baseURL: config.eventStore.baseURL,
      withCredentials: true,
      auth: config.eventStore.auth,
    });
    return {
      imports: [eventStoreHttpModule],
      module: EventStoreProjectionsModule,
      providers: [projections, projectionsDir],
      exports: [EventStoreProjectionStateProvider],
    };
  }

  constructor(
    @Inject(PROJECTION_SOURCES_PROVIDER)
    private readonly projectionSources: ProjectionSources,
    private readonly projectionContext: ProjectionContext,
    @Inject(PROJECTIONS) private readonly projections: ProjectionName[],
  ) {}

  async onModuleInit() {
    return await Promise.all(
      this.projections.map(projectionName => {
        const projectionSource = this.projectionSources.projectionSource(
          projectionName,
        );
        return this.projectionContext.ensureProjection(
          projectionName,
          projectionSource,
        );
      }),
    ).catch(
      e =>
        new Error(
          'Failed to create required projections, due to: ' + e.message,
        ),
    );
  }
}
