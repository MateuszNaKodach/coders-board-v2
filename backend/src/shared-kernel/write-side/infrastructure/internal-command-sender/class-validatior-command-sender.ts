import { InternalCommandSender } from '../../application/internal-command-sender/internal-command-sender';
import { InternalCommand } from '../../application/internal-command-sender/internal-command';
import { validateOrReject } from 'class-validator';
import { InternalCommandRejectedException } from '../../application/internal-command-sender/internal-command-rejected.exception';
import { InternalCommandInvalidSchemaException } from '../../application/internal-command-sender/internal-command-invalid-schema.exception';

export class ClassValidatorInternalCommandSender implements InternalCommandSender {
  constructor(private readonly commandSender: InternalCommandSender) {}

  sendAndWait<R>(command: InternalCommand): Promise<R> {
    return validateOrReject(command)
      .catch(validationError => {
        throw new InternalCommandInvalidSchemaException(command, validationError);
      })
      .then(() => this.commandSender.sendAndWait<R>(command));
  }

  sendAndForget<T extends InternalCommand>(command: T): Promise<void> {
    return validateOrReject(command)
      .catch(validationError => {
        throw new InternalCommandInvalidSchemaException(command, validationError);
      })
      .then(() => this.commandSender.sendAndForget(command));
  }
}
