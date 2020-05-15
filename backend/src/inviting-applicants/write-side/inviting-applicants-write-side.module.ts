import { Module } from '@nestjs/common';
import { InvitingApplicantsApplicationModule } from './application/inviting-applicants-application.module';
import { InvitingApplicantsInfrastructureModule } from './infrastructure/inviting-applicants-infrastructure.module';
import { InvitingApplicantsExternalCommandHandlersModule } from './presentation/external-command-handlers/inviting-applicants-external-command-handlers.module';
import { InvitingApplicantsWriteSideRestApiModule } from './presentation/rest-api/inviting-applicants-write-side-rest-api.module';

const writeRestApi = InvitingApplicantsWriteSideRestApiModule;
const externalCommandHandlers = InvitingApplicantsExternalCommandHandlersModule;

@Module({
  imports: [
    writeRestApi,
    externalCommandHandlers,
    InvitingApplicantsApplicationModule,
    InvitingApplicantsInfrastructureModule,
  ],
})
export class InvitingApplicantsWriteSideModule {}
