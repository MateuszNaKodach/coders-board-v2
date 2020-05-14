import { ApplicantInvitationPublicCommand } from '@coders-board-library/public-messages/inviting-applicants/command/applicant-invitation.public-command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TimeProviderPort } from '../../../../shared-kernel/write-side/domain/time-provider.port';
import { Inject } from '@nestjs/common';
import { TIME_PROVIDER } from '@coders-board-library/time-provider';
import {
  INTERNAL_COMMAND_SENDER,
  InternalCommandSender,
} from '../../../../shared-kernel/write-side/application/internal-command-sender/internal-command-sender';
import { ApplicantInvitationInternalCommand } from '../../application/applicant-invitation.internal-command';

export namespace ApplicantInvitationExternalCommandHandler {
  @CommandHandler(ApplicantInvitationPublicCommand.InviteApplicantCommand)
  class InviteApplicantCommand
    implements
      ICommandHandler<ApplicantInvitationPublicCommand.InviteApplicantCommand> {
    constructor(
      @Inject(TIME_PROVIDER) private readonly timeProvider: TimeProviderPort,
      @Inject(INTERNAL_COMMAND_SENDER)
      private readonly internalCommandSender: InternalCommandSender,
    ) {}

    async execute({
      firstName,
      lastName,
      personalEmail,
    }: ApplicantInvitationPublicCommand.InviteApplicantCommand): Promise<
      string
    > {
      return this.internalCommandSender.sendAndWait(
        new ApplicantInvitationInternalCommand.InviteApplicant(
          personalEmail,
          firstName,
          lastName,
        ),
      );
    }
  }

  @CommandHandler(
    ApplicantInvitationPublicCommand.CancelApplicantInvitationCommand,
  )
  class CancelApplicantInvitationCommand
    implements
      ICommandHandler<
        ApplicantInvitationPublicCommand.CancelApplicantInvitationCommand
      > {
    constructor(
      @Inject(INTERNAL_COMMAND_SENDER)
      private readonly internalCommandSender: InternalCommandSender,
    ) {}

    async execute({
      applicantInvitationId,
    }: ApplicantInvitationPublicCommand.CancelApplicantInvitationCommand) {
      return this.internalCommandSender.sendAndWait(
        new ApplicantInvitationInternalCommand.CancelApplicantInvitation(
          applicantInvitationId,
        ),
      );
    }
  }

  export const All = [InviteApplicantCommand, CancelApplicantInvitationCommand];
}
