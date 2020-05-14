import { Module } from '@nestjs/common';
import { InvitingApplicantsInfrastructureModule } from '../infrastructure/inviting-applicants-infrastructure.module';
import { EventPropagator } from './applicant-invitation.event-propagator';
import { ApplicantInvitationInternalCommandHandler } from './applicant-invitation.internal-command-handler';

@Module({
  imports: [InvitingApplicantsInfrastructureModule],
  providers: [
    ...ApplicantInvitationInternalCommandHandler.All,
    ...EventPropagator.All,
  ],
  exports: [],
})
export class InvitingApplicantsApplicationModule {}
