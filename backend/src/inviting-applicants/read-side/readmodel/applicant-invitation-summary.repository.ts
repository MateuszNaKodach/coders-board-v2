import {ApplicantInvitationSummary} from "./applicant-invitation-summary/applicant-invitation-summary";

export const APPLICANT_INVITATION_SUMMARY_REPOSITORY = Symbol('APPLICANT_INVITATION_SUMMARY_REPOSITORY');

export interface ApplicantInvitationSummaryRepository {
  findAllPending(): Promise<ApplicantInvitationSummary[]>;

  findAllCancelled(): Promise<ApplicantInvitationSummary[]>;

  update(invitationSummary: ApplicantInvitationSummary): Promise<void>;

  findByInvitationId(invitationId: string): Promise<ApplicantInvitationSummary>;
}
