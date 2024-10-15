import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: Logger) {}
  async use(req: Request, res: Response, next: NextFunction) {
    console.log('LoggerMiddleware');
    const { method, originalUrl: url } = req;
    const reqTime = new Date().getTime();

    res.on('finish', () => {
      const { statusCode } = res;
      const resTime = new Date().getTime();

      if (statusCode === 200 || statusCode === 201) {
        this.logger.log(
          `${method} - ${url} ${statusCode} ==> ${reqTime - resTime} ms`,
        );
      }
    });

    next();
  }
}
