import { Module } from '@nestjs/common';
import { InvitingApplicantsInfrastructureModule } from '../infrastructure/inviting-applicants-infrastructure.module';
import * as ApplicantInvitationEventPropagators from './event-propagator/index';
import * as ApplicantInvitationInternalCommandHandlers from './internal-command-handler/index';

@Module({
  imports: [InvitingApplicantsInfrastructureModule],
  providers: [...ApplicantInvitationInternalCommandHandlers.All, ...ApplicantInvitationEventPropagators.All],
  exports: [],
})
export class InvitingApplicantsApplicationModule {}
