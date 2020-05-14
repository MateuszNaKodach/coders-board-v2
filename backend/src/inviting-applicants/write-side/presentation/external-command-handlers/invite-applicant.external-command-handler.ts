import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InviteApplicantPublicCommand } from '@coders-board-library/public-messages';
import { Inject } from '@nestjs/common';
import { TIME_PROVIDER } from '@coders-board-library/time-provider';
import { TimeProviderPort } from '../../../../shared-kernel/write-side/domain/time-provider.port';
import {
  INTERNAL_COMMAND_SENDER,
  InternalCommandSender,
} from '../../../../shared-kernel/write-side/application/internal-command-sender/internal-command-sender';
import { InviteApplicant } from '../../application/internal-command/invite-applicant.internal-command';

@CommandHandler(InviteApplicantPublicCommand)
export class InviteApplicantExternalCommandHandler
  implements ICommandHandler<InviteApplicantPublicCommand> {
  constructor(
    @Inject(TIME_PROVIDER) private readonly timeProvider: TimeProviderPort,
    @Inject(INTERNAL_COMMAND_SENDER)
    private readonly internalCommandSender: InternalCommandSender,
  ) {}

  async execute({
    firstName,
    lastName,
    personalEmail,
  }: InviteApplicantPublicCommand): Promise<string> {
    return this.internalCommandSender.sendAndWait(
      new InviteApplicant(personalEmail, firstName, lastName),
    );
  }
}
