import { Module } from '@nestjs/common';
import { InvitingApplicantsInfrastructureModule } from '../../infrastructure/inviting-applicants-infrastructure.module';
import * as ApplicantInvitationExternalCommandHandlers from './index';

@Module({
  imports: [InvitingApplicantsInfrastructureModule],
  providers: [...ApplicantInvitationExternalCommandHandlers.All],
  exports: [],
})
export class InvitingApplicantsExternalCommandHandlersModule {}
