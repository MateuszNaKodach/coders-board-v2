export function errorCausedBy(error: Error, causation: Error): Error {
  error.stack += '\nCaused by: \n' + causation.message + '\n' + causation.stack;
  return error;
}
