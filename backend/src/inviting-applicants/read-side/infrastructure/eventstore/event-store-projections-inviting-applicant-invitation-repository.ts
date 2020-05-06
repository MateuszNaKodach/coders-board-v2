import { ApplicantInvitationRepository } from '../../projection/current-pending-invitations/v1/applicant-invitation.repository';
import {
  CurrentPendingInvitationsV1ReadModel,
  PendingInvitation,
} from '../../projection/current-pending-invitations/v1/current-pending-invitations.v1.read-model';
import { EventStoreProjectionStateProvider } from '@coders-board-library/eventstore-projections/api/event-store-projection-state-provider';
import { PROJECTION_CURRENT_PENDING_INVITATIONS } from '../../projection/projection-names';

export class EventStoreProjectionsInvitingApplicantInvitationRepository
  implements ApplicantInvitationRepository {
  constructor(
    private readonly eventStoreProjectionStateProvider: EventStoreProjectionStateProvider,
  ) {}

  findAllPending(): Promise<PendingInvitation[]> {
    return this.eventStoreProjectionStateProvider
      .projectionState<CurrentPendingInvitationsV1ReadModel>(
        PROJECTION_CURRENT_PENDING_INVITATIONS,
      )
      .then(projectionState => projectionState.content.pendingInvitations);
  }
}
