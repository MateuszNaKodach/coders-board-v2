import { Module } from '@nestjs/common';
import { InvitingApplicantsWriteSideModule } from './inviting-applicants/write-side/inviting-applicants-write-side.module';
import { InvitingApplicantsReadSideModule } from './inviting-applicants/read-side/inviting-applicants-read-side.module';

const boundedContexts = {
  invitingApplicants: [InvitingApplicantsWriteSideModule, InvitingApplicantsReadSideModule],
};

@Module({
  imports: [...boundedContexts.invitingApplicants],
  controllers: [],
  providers: [],
})
export class AppModule {}
