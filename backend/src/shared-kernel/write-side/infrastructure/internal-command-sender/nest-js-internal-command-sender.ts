import { CommandBus } from '@nestjs/cqrs';
import { InternalCommandSender } from '../../application/internal-command-sender/internal-command-sender';
import { InternalCommand } from '../../application/internal-command-sender/internal-command';

export class NestJsInternalCommandSender implements InternalCommandSender {
  constructor(private readonly commandBus: CommandBus) {}

  sendAndWait<R>(command: InternalCommand): Promise<R> {
    return this.commandBus.execute(command);
  }

  sendAndForget<T extends InternalCommand>(command: T): Promise<void> {
    this.commandBus.execute(command).then();
    return Promise.resolve();
  }
}
