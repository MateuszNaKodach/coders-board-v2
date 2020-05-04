import { Module } from '@nestjs/common';
import { ApplicantInvitationEventSourcedRepository } from './applicant-invitation.event-sourced-repository';
import { SharedKernelInfrastructureModule } from '../../../shared-kernel/write-side/infrastructure/shared-kernel-infrastructure.module';
import { APPLICANT_INVITATION_REPOSITORY } from '../domain/applicant-invitation.repository';

@Module({
  imports: [SharedKernelInfrastructureModule],
  providers: [
    {
      provide: APPLICANT_INVITATION_REPOSITORY,
      useClass: ApplicantInvitationEventSourcedRepository,
    },
  ],
  exports: [APPLICANT_INVITATION_REPOSITORY, SharedKernelInfrastructureModule],
})
export class InvitingApplicantsInfrastructureModule {}
