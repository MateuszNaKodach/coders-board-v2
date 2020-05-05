import {DynamicModule, HttpModule, HttpService, Inject, Module, OnModuleInit,} from '@nestjs/common';
import {PROJECTION_SOURCES_PROVIDER, ProjectionSources,} from './projection-sources';
import {ResourcesProjectionSources} from '../../infrastructure/eventstore/resources-projection-sources';
import {HttpProjectionsManager} from '../../infrastructure/eventstore/http-projections-manager';
import {ProjectionContext} from './projection-context';
import {ProjectionName} from "./projection-name";
import {PROJECTIONS_MANAGER, ProjectionsManager} from "./projections-manager";
import {
  InvitingApplicantsEventStoreProjectionModuleConfig,
  PROJECTIONS
} from "./inviting-applicants-event-store-projection.module-config";

const PROJECTIONS_DIR = Symbol("PROJECTIONS_DIR");

const eventStoreHttpModule = HttpModule.register({
  baseURL: process.env.EVENTSTORE_URL,
  withCredentials: true,
  auth: {
    username: process.env.EVENTSTORE_USERNAME,
    password: process.env.EVENTSTORE_PASSWORD,
  },
});

@Module({
  imports: [eventStoreHttpModule],
  providers: [
    {
      inject: [PROJECTIONS_DIR],
      useFactory: (projectionsDir: string) => new ResourcesProjectionSources(projectionsDir),
      provide: PROJECTION_SOURCES_PROVIDER,
    },
    {
      inject: [HttpService],
      useFactory: (httpService: HttpService) => {
        return new HttpProjectionsManager(httpService)
      },
      provide: PROJECTIONS_MANAGER
    },
    {
      inject: [PROJECTIONS_MANAGER],
      useFactory: (projectionsManager: ProjectionsManager) => {
        return new ProjectionContext(projectionsManager)
      },
      provide: ProjectionContext,
    },
  ],
})
export class InvitingApplicantsEventStoreProjectionModule
    implements OnModuleInit {

  static register(
      config: InvitingApplicantsEventStoreProjectionModuleConfig,
  ): DynamicModule {
    const projections = {
      provide: PROJECTIONS,
      useValue: config.projections,
    };
    const projectionsDir = {
      provide: PROJECTIONS_DIR,
      useValue: config.projectionsDir,
    };
    return {
      module: InvitingApplicantsEventStoreProjectionModule,
      providers: [projections, projectionsDir],
      exports: [],
    };
  }

  constructor(@Inject(PROJECTION_SOURCES_PROVIDER)
              private readonly projectionSources: ProjectionSources,
              private readonly projectionContext: ProjectionContext,
              @Inject(PROJECTIONS) private readonly projections: ProjectionName[]) {
  }

  async onModuleInit() {
    return await Promise.all(
        this.projections.map(projectionName => {
              const projectionSource = this.projectionSources.projectionSource(projectionName)
              return this.projectionContext.ensureProjection(projectionName, projectionSource);
            }
        )
    ).catch(e => new Error("Failed to create required projections, due to: " + e.message));
  }
}

