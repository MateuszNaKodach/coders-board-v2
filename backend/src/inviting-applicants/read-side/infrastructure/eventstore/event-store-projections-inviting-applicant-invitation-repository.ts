import {ApplicantInvitationSummaryRepository} from '../../readmodel/applicant-invitation-summary.repository';
import {
  PendingInvitationsV1ReadModel,
} from '../../readmodel/pending-invitations/v1/pending-invitations-v1-read.model';
import {EventStoreProjectionResultProvider} from '@coders-board-library/eventstore-projections/api/event-store-projection-result-provider';
import {
  PROJECTION_CANCELLED_INVITATIONS_V1,
  PROJECTION_PENDING_INVITATIONS_V1,
} from '../../readmodel/projection-names';
import {
  CancelledInvitationsV1ReadModel,
} from '../../readmodel/cancelled-invitations/v1/cancelled-invitations-v1-read.model';
import {ApplicantInvitationSummary} from "../../readmodel/applicant-invitation-summary/applicant-invitation-summary";

export class EventStoreProjectionsInvitingApplicantInvitationRepository implements ApplicantInvitationSummaryRepository {
  constructor(private readonly eventStoreProjectionStateProvider: EventStoreProjectionResultProvider) {
  }

  findAllPending(): Promise<ApplicantInvitationSummary[]> {
    return this.eventStoreProjectionStateProvider
        .projectionResult<PendingInvitationsV1ReadModel>(PROJECTION_PENDING_INVITATIONS_V1)
        .then(projectionState => projectionState.content.pendingInvitations);
  }

  findAllCancelled(): Promise<ApplicantInvitationSummary[]> {
    return this.eventStoreProjectionStateProvider
        .projectionResult<CancelledInvitationsV1ReadModel>(PROJECTION_CANCELLED_INVITATIONS_V1)
        .then(projectionState => projectionState.content.cancelledInvitations);
  }

  async update(invitation: ApplicantInvitationSummary) {
    throw new Error("Not supported!")
  }

  findByInvitationId(invitationId: string): Promise<ApplicantInvitationSummary> {
    throw new Error("Not supported!")
  }

}
