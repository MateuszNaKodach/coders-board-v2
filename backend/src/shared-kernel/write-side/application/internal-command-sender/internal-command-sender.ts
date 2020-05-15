import { InternalCommand } from './internal-command';

export const INTERNAL_COMMAND_SENDER = Symbol('INTERNAL_COMMAND_SENDER');

export interface InternalCommandSender {
  sendAndWait<R = void>(command: InternalCommand): Promise<R>;

  //TODO: Add inbox and ack
  sendAndForget(command: InternalCommand): Promise<void>;
}
