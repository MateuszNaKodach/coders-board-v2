import { Module } from '@nestjs/common';
import { InvitingApplicantsInfrastructureModule } from '../../infrastructure/inviting-applicants-infrastructure.module';
import { ApplicantInvitationExternalCommandHandler } from './applicant-invitation.external-command-handler';

@Module({
  imports: [InvitingApplicantsInfrastructureModule],
  providers: [...ApplicantInvitationExternalCommandHandler.All],
  exports: [],
})
export class InvitingApplicantsExternalCommandHandlersModule {}
