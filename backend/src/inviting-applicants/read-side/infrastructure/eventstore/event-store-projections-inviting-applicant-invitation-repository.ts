import { ApplicantInvitationRepository } from '../../projection/pending-invitations/v1/applicant-invitation.repository';
import {
  PendingInvitationsV1ReadModel,
  PendingInvitation,
} from '../../projection/pending-invitations/v1/pending-invitations-v1-read.model';
import { EventStoreProjectionResultProvider } from '@coders-board-library/eventstore-projections/api/event-store-projection-result-provider';
import {
  PROJECTION_CANCELLED_INVITATIONS_V1,
  PROJECTION_PENDING_INVITATIONS_V1,
} from '../../projection/projection-names';
import {
  CancelledInvitation,
  CancelledInvitationsV1ReadModel,
} from '../../projection/cancelled-invitations/v1/cancelled-invitations-v1-read.model';

export class EventStoreProjectionsInvitingApplicantInvitationRepository implements ApplicantInvitationRepository {
  constructor(private readonly eventStoreProjectionStateProvider: EventStoreProjectionResultProvider) {}

  findAllPending(): Promise<PendingInvitation[]> {
    return this.eventStoreProjectionStateProvider
      .projectionResult<PendingInvitationsV1ReadModel>(PROJECTION_PENDING_INVITATIONS_V1)
      .then(projectionState => projectionState.content.pendingInvitations);
  }

  findAllCancelled(): Promise<CancelledInvitation[]> {
    return this.eventStoreProjectionStateProvider
      .projectionResult<CancelledInvitationsV1ReadModel>(PROJECTION_CANCELLED_INVITATIONS_V1)
      .then(projectionState => projectionState.content.cancelledInvitations);
  }
}
