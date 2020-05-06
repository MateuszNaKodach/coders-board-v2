import { PendingInvitation } from './current-pending-invitations.v1.read-model';
import { Observable } from 'rxjs';

const APPLICANT_INVITATION_REPOSITORY = Symbol(
  'APPLICANT_INVITATION_REPOSITORY',
);

export interface ApplicantInvitationRepository {
  findAllPending(): Promise<PendingInvitation[]>;
}
