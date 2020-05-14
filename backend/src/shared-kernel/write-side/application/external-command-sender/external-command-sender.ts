import { PublicCommand } from '@coders-board-library/public-messages';

export const EXTERNAL_COMMAND_SENDER = Symbol('EXTERNAL_COMMAND_SENDER');

//TODO: Add sendAndForget and also request-response with messaging
export interface ExternalCommandSender {
  send<T extends PublicCommand>(command: T): Promise<any>;
}
