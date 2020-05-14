import { Module } from '@nestjs/common';
import { InvitingApplicantsEventStoreProjectionsModule } from './infrastructure/eventstore/inviting-applicants-event-store-projections.module';
import {
  PROJECTION_CANCELLED_INVITATIONS_V1,
  PROJECTION_INVITED_APPLICANTS_COUNTER_V1,
  PROJECTION_PENDING_INVITATIONS_V1,
} from './projection/projection-names';
import { ApplicantInvitationV1ReadSideController } from './presentation/rest-api/v1/applicant-invitation.v1.read-side-controller';
import { SharedKernelReadSideInfrastructureModule } from '../../shared-kernel/read-side/infrastructure/shared-kernel-read-side-infrastructure.module';
import * as InvitingApplicantsQueryHandlers from './query/handlers';

//TODO: Add selecting projection engine! EventStore for example

const eventStoreProjectionModule = InvitingApplicantsEventStoreProjectionsModule.eventStoreProjectionEngine(
  [
    PROJECTION_INVITED_APPLICANTS_COUNTER_V1,
    PROJECTION_PENDING_INVITATIONS_V1,
    PROJECTION_CANCELLED_INVITATIONS_V1,
  ],
);

@Module({
  controllers: [ApplicantInvitationV1ReadSideController],
  imports: [eventStoreProjectionModule, SharedKernelReadSideInfrastructureModule],
  providers: [...InvitingApplicantsQueryHandlers.All],
})
export class InvitingApplicantsReadSideModule {}
