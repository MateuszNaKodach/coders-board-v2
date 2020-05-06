import { Query } from '../../../shared-kernel/read-side/query/query';

export namespace InvitingApplicantsQuery {
  export class AllApplicantInvitations implements Query {}

  export const All = new AllApplicantInvitations();
}
