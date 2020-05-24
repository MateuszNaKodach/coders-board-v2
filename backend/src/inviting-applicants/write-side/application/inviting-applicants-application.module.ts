import { Module } from '@nestjs/common';
import { InvitingApplicantsInfrastructureModule } from '../infrastructure/inviting-applicants-infrastructure.module';
import * as ApplicantInvitationEventPropagators from './event-propagator/index';
import * as ApplicantInvitationInternalCommandHandlers from './internal-command-handler/index';
import { InvitingApplicantsMailerModule } from './email-sender/email-sender.module';
import { ConfigModule } from '@nestjs/config';
import { EmailSenderProvider } from './email-sender/email-sender.provider';

@Module({
  imports: [InvitingApplicantsInfrastructureModule, InvitingApplicantsMailerModule, ConfigModule.forRoot()],
  providers: [
    ...ApplicantInvitationInternalCommandHandlers.All,
    ...ApplicantInvitationEventPropagators.All,
    EmailSenderProvider,
  ],
  exports: [],
})
export class InvitingApplicantsApplicationModule {}
