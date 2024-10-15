import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import config from 'src/config/config';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private jwtServices: JwtService,
    private configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log('inside AuthenticationGuard');

    try {
      const authorizationToken = request.headers.authorization.split(' ')[1];

      if (!authorizationToken) {
        throw new UnauthorizedException();
      }

      console.log(this.configService.get('secret.JwtService'), 'hello');

      const isAuthorizationToken = this.jwtServices.verify(authorizationToken, {
        // secret: this.configService.get('secret.JwtService'),
        // secret: this.configService.get('SECRET_KEY'),
      });
      console.log(isAuthorizationToken, 'isAuthenticationToken');

      request.userInfo = isAuthorizationToken;
    } catch (error) {
      console.log(error, 'error');
      throw new UnauthorizedException();
    }

    return true;
  }
}
