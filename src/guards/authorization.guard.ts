import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/decorators/role.decorator';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('inside AuthorizationGuard');

    const request = context.switchToHttp().getRequest();

    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const { role } = request.userInfo;

    const roleArray = role.split(',');

    console.log(roleArray, 'userInfo_role');
    console.log(requiredRoles, 'metaData AuthorizationGuard');

    const hasRequiredRole = roleArray.some((r: string[]) =>
      requiredRoles.includes(r),
    );

    console.log(hasRequiredRole);

    if (!hasRequiredRole) return false;

    return true;
  }
}
