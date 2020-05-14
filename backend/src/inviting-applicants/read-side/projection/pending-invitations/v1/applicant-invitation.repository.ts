import { PendingInvitation } from './pending-invitations-v1-read.model';
import { CancelledInvitation } from '../../cancelled-invitations/v1/cancelled-invitations-v1-read.model';

const APPLICANT_INVITATION_REPOSITORY = Symbol('APPLICANT_INVITATION_REPOSITORY');

export interface ApplicantInvitationRepository {
  findAllPending(): Promise<PendingInvitation[]>;
  findAllCancelled(): Promise<CancelledInvitation[]>;
}
