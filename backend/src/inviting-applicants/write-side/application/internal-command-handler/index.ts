import { ApplicantInvitationRepository } from '../../domain/applicant-invitation.repository';
import { ApplicantInvitationId } from '../../domain/applicant-invitation-id.valueobject';
import { ApplicantInvitation } from '../../domain/applicant-invitation.aggregate-root';
import { InviteApplicantInternalCommandHandler } from './invite-applicant.internal-command-handler';
import { CancelApplicantInvitationInternalCommandHandler } from './cancel-applicant-invitation.internal-command-handler';

export const All = [
  InviteApplicantInternalCommandHandler,
  CancelApplicantInvitationInternalCommandHandler,
];

export const executeCommand = async (
  repository: ApplicantInvitationRepository,
  targetId: ApplicantInvitationId,
  command: (target: ApplicantInvitation) => void,
): Promise<void> => {
  const aggregate = await repository.findById(targetId);
  if (!aggregate) {
    throw new Error(`Applicant invitation with id ${targetId} not found!`);
  }
  command(aggregate);
  return repository.save(aggregate);
};
