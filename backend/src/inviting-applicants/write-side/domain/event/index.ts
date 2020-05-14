import { ApplicantInvited } from './applicant-invited.domain-event';
import { InvitationCancelled } from './invitation-cancelled.domain-events';
import { CancelingApplicantInvitationFailed } from './cancelling-applicant-invitation-failed.domain-event';
import { InvitingApplicantFailed } from './inviting-applicant-failed.domain-event';

export const InvitingApplicantsDomainEvents = {
  ApplicantInvited,
  InvitingApplicantFailed,
  InvitationCancelled,
  CancelingApplicantInvitationFailed,
};
