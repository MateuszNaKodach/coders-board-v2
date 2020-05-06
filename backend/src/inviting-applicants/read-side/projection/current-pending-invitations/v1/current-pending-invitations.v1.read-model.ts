export interface CurrentPendingInvitationsV1ReadModel {
  pendingInvitations: PendingInvitation[];
}

export class PendingInvitation {
  invitationId: string;
  firstName: string;
  lastName: string;
  personalEmail: string;
  invitedAt: Date;
}
