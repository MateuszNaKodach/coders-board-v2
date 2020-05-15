import { InternalCommand } from './internal-command';
import { Exception } from '@coders-board-library/typescript-sdk/exception';
import { ValidationError } from 'class-validator';

export class InternalCommandInvalidSchemaException extends Exception {
  constructor(command: InternalCommand, readonly validationErrors: ValidationError[]) {
    super(
      `Internal command ${
        command.constructor.name
      } rejected! Schema doesn't match. \n Validation errors: ${validationErrors.map(
        (it, index) => `\n${index + 1}. ${it}`,
      )}`,
    );
  }
}
