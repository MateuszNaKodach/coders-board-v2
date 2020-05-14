import { validateOrReject } from 'class-validator';
import { ExternalCommandSender } from '../../application/external-command-sender/external-command-sender';
import { PublicCommand } from '@coders-board-library/public-messages';

export class ClassValidatorExternalCommandSender implements ExternalCommandSender {
  constructor(private readonly commandSender: ExternalCommandSender) {}

  send<T extends PublicCommand>(command: T): Promise<any> {
    return validateOrReject(command).then(() => this.commandSender.send<T>(command));
  }
}
