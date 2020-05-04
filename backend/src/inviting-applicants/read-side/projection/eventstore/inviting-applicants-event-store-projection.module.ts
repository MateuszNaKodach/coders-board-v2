import {HttpModule, HttpService, Inject, Module, OnModuleInit} from '@nestjs/common';
import {PROJECTION_SOURCES_PROVIDER, ProjectionSources} from "./projection-sources";
import {ResourcesProjectionSources} from "../../infrastructure/eventstore/resources-projection-sources";
import {HttpProjectionsManager} from "../../infrastructure/eventstore/http-projections-manager";
import {ProjectionContext} from "./projection-context";
import {axiosLoggingInterceptor} from "@coders-board-library/axios-utils/axios-utils/logging.interceptor";

const eventStoreHttpModule = HttpModule.register({
      baseURL: process.env.EVENTSTORE_URL,
      withCredentials: true,
      auth: {
        username: process.env.EVENTSTORE_USERNAME,
        password: process.env.EVENTSTORE_PASSWORD,
      },
    }
);


@Module({
  imports: [eventStoreHttpModule],
  providers: [
    {
      provide: PROJECTION_SOURCES_PROVIDER,
      useClass: ResourcesProjectionSources
    },
    {
      inject: [HttpService],
      useFactory: (httpService: HttpService) => new ProjectionContext(new HttpProjectionsManager(httpService)),
      provide: ProjectionContext
    },
  ]
})
export class InvitingApplicantsEventStoreProjectionModule implements OnModuleInit {

  constructor(
      @Inject(PROJECTION_SOURCES_PROVIDER) private readonly projectionSources: ProjectionSources,
      private readonly projectionContext: ProjectionContext,
      private httpService: HttpService
  ) {
  }

  async onModuleInit() {
    //const loggingInterceptor = axiosLoggingInterceptor(reqRes => console.log(reqRes), false, true);
    //this.httpService.axiosRef.interceptors.response.use(loggingInterceptor.onRejected, loggingInterceptor.onFulfilled);


    const counterQuery = this.projectionSources.projectionQuerySource("counter");
    await this.projectionContext.ensureProjection("sampleCounter", counterQuery);
    const sampleCounterProjectionState = await this.projectionContext.projectionState<any>("sampleCounter")
    console.log("STATE", sampleCounterProjectionState);
  }
}


