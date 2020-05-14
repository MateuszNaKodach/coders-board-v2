import { InternalCommandSender } from '../../application/internal-command-sender/internal-command-sender';
import { InternalCommand } from '../../application/internal-command-sender/internal-command';
import { validateOrReject } from 'class-validator';

export class ClassValidatorInternalCommandSender implements InternalCommandSender {
  constructor(private readonly commandSender: InternalCommandSender) {}

  sendAndWait<R>(command: InternalCommand): Promise<R> {
    return validateOrReject(command).then(() => this.commandSender.sendAndWait<R>(command));
  }

  sendAndForget<T extends InternalCommand>(command: T) {
    return validateOrReject(command).then(() => this.commandSender.sendAndForget(command));
  }
}
