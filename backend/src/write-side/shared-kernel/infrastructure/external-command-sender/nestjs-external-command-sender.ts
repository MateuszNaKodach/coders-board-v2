import { ExternalCommand } from '@coders-board-library/public-messages';
import { ExternalCommandSender } from '../../application/external-command-sender/external-command-sender';
import { CommandBus } from '@nestjs/cqrs';

export class NestJsExternalCommandSender implements ExternalCommandSender {
  constructor(private readonly commandBus: CommandBus) {}

  send<T extends ExternalCommand>(command: T) {
    return this.commandBus.execute(command);
  }
}
