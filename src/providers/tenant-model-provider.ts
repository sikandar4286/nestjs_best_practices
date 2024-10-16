import { InternalServerErrorException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import {
  Product,
  ProductSchema,
} from 'src/tenant-product/tenat-product.schema';

export const TenantModalProvider = {
  productModal: {
    provide: 'PRODUCT_MODAL',
    useFactory: async (tenantConnection: Connection) => {
      return tenantConnection.model(Product.name, ProductSchema);
    },
    inject: ['TENANT_CONNECTION'],
    //   scope: Scope.REQUEST,
  },
};
