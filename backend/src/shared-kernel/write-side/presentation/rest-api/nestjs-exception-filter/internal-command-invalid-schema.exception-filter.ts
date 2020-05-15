import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { InternalCommandInvalidSchemaException } from '../../../application/internal-command-sender/internal-command-invalid-schema.exception';

@Catch(InternalCommandInvalidSchemaException)
export class InternalCommandInvalidSchemaExceptionFilter implements ExceptionFilter {
  catch(exception: InternalCommandInvalidSchemaException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.validationErrors, //TODO: Flatten from NestJS validation pipe!
    });
  }
}
