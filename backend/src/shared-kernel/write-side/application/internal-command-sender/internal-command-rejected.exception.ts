import { InternalCommand } from './internal-command';
import { Exception } from '@coders-board-library/typescript-sdk/exception';

export class InternalCommandRejectedException extends Exception {
  constructor(command: InternalCommand, causation: Error | undefined) {
    super(`Internal command ${command.constructor.name} rejected!`, causation);
  }
}
