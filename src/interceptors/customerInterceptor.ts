import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { firstValueFrom, lastValueFrom, map, Observable } from 'rxjs';

@Injectable()
export class CustomerInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    console.log('inside CustomerInterceptor');

    console.log(context.switchToHttp().getRequest().headers, 'get request');

    const request = context.switchToHttp().getRequest<Request>();
    request.headers['accept-language'] = 'en-EN';

    // console.log(request.headers, 'request');

    // const response = next.handle();

    // const response = await lastValueFrom(next.handle());
    // const response = await firstValueFrom(next.handle());
    // console.log(response, 'response CustomerInterceptor');

    // return response;

    return next.handle().pipe(map((data) => ({ data, timeStamp: new Date() })));
  }
}
