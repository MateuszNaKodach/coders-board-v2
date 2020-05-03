import { ExternalCommand } from '@coders-board-library/public-messages';

export const EXTERNAL_COMMAND_SENDER = Symbol('EXTERNAL_COMMAND_SENDER');

export interface ExternalCommandSender {
  send<T extends ExternalCommand>(command: T): Promise<any>;
}
