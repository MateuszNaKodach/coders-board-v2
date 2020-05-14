import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  APPLICANT_INVITATION_REPOSITORY,
  ApplicantInvitationRepository,
} from '../../domain/applicant-invitation.repository';
import { executeCommand } from './index';
import { ApplicantInvitationId } from '../../domain/applicant-invitation-id.valueobject';
import { CancelApplicantInvitation } from '../internal-command/cancel-applicant-invitation.internal-command';

@CommandHandler(CancelApplicantInvitation)
export class CancelApplicantInvitationInternalCommandHandler
  implements ICommandHandler<CancelApplicantInvitation> {
  constructor(
    @Inject(APPLICANT_INVITATION_REPOSITORY)
    private readonly repository: ApplicantInvitationRepository,
  ) {}

  async execute({ applicantInvitationId }: CancelApplicantInvitation) {
    return executeCommand(
      this.repository,
      ApplicantInvitationId.of(applicantInvitationId),
      invitation => invitation.cancel(),
    );
  }
}
