import { Query } from '../../../shared-kernel/read-side/query/query';

export namespace InvitingApplicantsQuery {
  export class AllPendingInvitations implements Query {}

  export class AllCancelledInvitations implements Query {}

  export const AllPending = new AllPendingInvitations();
  export const AllCancelled = new AllCancelledInvitations();
}
