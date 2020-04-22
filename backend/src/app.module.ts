import { Module } from '@nestjs/common';
import { InvitingApplicantsModule } from './write-side/inviting-applicants/inviting-applicants.module';

@Module({
  imports: [InvitingApplicantsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
