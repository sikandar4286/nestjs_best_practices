import { InternalServerErrorException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

export const TenantConnectionProvider = {
  provide: 'TENANT_CONNECTION',
  useFactory: async (request, connection: Connection) => {
    if (!request.tenantId) {
      throw new InternalServerErrorException(
        'make sure tenantId in passed for connection',
      );
    }
    return connection.useDb(`tenant_${request.tenantId}`);
  },
  inject: [REQUEST, getConnectionToken('tenant')],
  //   scope: Scope.REQUEST,
};
