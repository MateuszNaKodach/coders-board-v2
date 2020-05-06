import { Module } from '@nestjs/common';
import { InvitingApplicantsEventStoreProjectionsModule } from './infrastructure/eventstore/inviting-applicants-event-store-projections.module';
import {
  PROJECTION_CURRENT_PENDING_INVITATIONS,
  PROJECTION_INVITED_APPLICANTS_COUNTER_V1,
} from './projection/projection-names';
import { InvitingApplicantsQueryHandler } from './query/handlers/inviting-applicants.query-handler';
import { ApplicantInvitationV1ReadSideController } from './presentation/rest-api/v1/applicant-invitation.v1.read-side-controller';
import { SharedKernelReadSideInfrastructureModule } from '../../shared-kernel/read-side/infrastructure/shared-kernel-read-side-infrastructure.module';

//TODO: Add selecting projection engine! EventStore for example

const eventStoreProjectionModule = InvitingApplicantsEventStoreProjectionsModule.eventStoreProjectionEngine(
  [
    PROJECTION_INVITED_APPLICANTS_COUNTER_V1,
    PROJECTION_CURRENT_PENDING_INVITATIONS,
  ],
);

@Module({
  controllers: [ApplicantInvitationV1ReadSideController],
  imports: [
    eventStoreProjectionModule,
    SharedKernelReadSideInfrastructureModule,
  ],
  providers: [...InvitingApplicantsQueryHandler.All],
})
export class InvitingApplicantsReadSideModule {}
