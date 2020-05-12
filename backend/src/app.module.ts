import {Module} from '@nestjs/common';
import {InvitingApplicantsWriteSideModule} from './inviting-applicants/write-side/inviting-applicants-write-side.module';
import {InvitingApplicantsReadSideModule} from './inviting-applicants/read-side/inviting-applicants-read-side.module';
import {PrometheusModule} from "@willsoto/nestjs-prometheus";

const metrics = PrometheusModule.register();
const boundedContexts = {
  invitingApplicants: [
    InvitingApplicantsWriteSideModule,
    InvitingApplicantsReadSideModule,
  ],
};

@Module({
  imports: [metrics, ...boundedContexts.invitingApplicants],
  controllers: [],
  providers: [],
})
export class AppModule {
}
