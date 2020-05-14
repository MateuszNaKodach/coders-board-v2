import { Module } from '@nestjs/common';
import { InvitingApplicantsInfrastructureModule } from '../../infrastructure/inviting-applicants-infrastructure.module';
import { ApplicantInvitationV1WriteSideController } from './v1/applicant-invitation.v1.write-side-controller';

@Module({
  imports: [InvitingApplicantsInfrastructureModule],
  controllers: [ApplicantInvitationV1WriteSideController],
})
export class InvitingApplicantsWriteSideRestApiModule {}
