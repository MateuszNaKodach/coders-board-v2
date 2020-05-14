import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  INTERNAL_COMMAND_SENDER,
  InternalCommandSender,
} from '../../../../shared-kernel/write-side/application/internal-command-sender/internal-command-sender';
import { CancelApplicantInvitation } from '../../application/internal-command/cancel-applicant-invitation.internal-command';
import { CancelApplicantInvitationPublicCommand } from '@coders-board-library/public-messages';

@CommandHandler(CancelApplicantInvitationPublicCommand)
export class CancelApplicantInvitationExternalCommandHandler
  implements ICommandHandler<CancelApplicantInvitationPublicCommand> {
  constructor(
    @Inject(INTERNAL_COMMAND_SENDER)
    private readonly internalCommandSender: InternalCommandSender,
  ) {}

  async execute({
    applicantInvitationId,
  }: CancelApplicantInvitationPublicCommand) {
    return this.internalCommandSender.sendAndWait(
      new CancelApplicantInvitation(applicantInvitationId),
    );
  }
}
