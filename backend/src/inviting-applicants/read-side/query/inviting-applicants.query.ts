import { ReadSideQuery } from '../../../shared-kernel/read-side/query/read-side-query';

export class AllPendingInvitations implements ReadSideQuery {}

export class AllCancelledInvitations implements ReadSideQuery {}

export const AllPending = new AllPendingInvitations();
export const AllCancelled = new AllCancelledInvitations();
