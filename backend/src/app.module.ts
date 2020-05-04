import { Module } from '@nestjs/common';
import { InvitingApplicantsModule } from './inviting-applicants/write-side/inviting-applicants.module';

@Module({
  imports: [InvitingApplicantsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
