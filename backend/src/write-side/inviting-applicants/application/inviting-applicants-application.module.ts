import { Module } from '@nestjs/common';
import { InvitingApplicantsInfrastructureModule } from '../infrastructure/inviting-applicants-infrastructure.module';
import { ApplicantInvitationCommandHandler } from './applicant-invitation.command-handler';
import { EventPropagator } from './applicant-invitation.event-propagator';

@Module({
  imports: [InvitingApplicantsInfrastructureModule],
  providers: [...ApplicantInvitationCommandHandler.All, ...EventPropagator.All],
  exports: [],
})
export class InvitingApplicantsApplicationModule {}
