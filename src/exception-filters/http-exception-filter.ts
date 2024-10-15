import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilters implements ExceptionFilter {
  constructor(private logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    this.logger.error(
      `${request.method} - ${request.originalUrl} ${status} error ${exception.message}`,
    );

    const errorDetails = exception.getResponse();

    response.status(status).json({
      //   statusCode: status,
      //   timeStamp: new Date().toISOString(),
      //   path: request.url,
      error: true,
      errorDetails,
    });
  }
}
