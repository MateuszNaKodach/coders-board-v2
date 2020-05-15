export class Exception extends Error {
  constructor(message: string, private readonly causation: Error | undefined = undefined) {
    super(message);
    this.stack = causation ? Exception.errorCausedBy(this, causation).stack : this.stack;
  }

  causedBy(causation: Error): Exception {
    return new Exception(Exception.errorCausedBy(this, causation).message, causation);
  }

  private static errorCausedBy(error: Error, causation: Error): Error {
    error.stack += '\nCaused by: \n' + causation.message + '\n' + causation.stack;
    return error;
  }
}
