import { ApplicantInvitation } from './applicant-invitation.aggregate-root';

export const APPLICANT_INVITATION_REPOSITORY = Symbol();

export interface ApplicantInvitationRepository {
  save(applicantInvitation: ApplicantInvitation): Promise<void>;

  findById(id: ApplicantInvitation['id']): Promise<ApplicantInvitation | null>;
}
