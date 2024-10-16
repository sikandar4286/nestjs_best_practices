import { Inject, Injectable } from '@nestjs/common';
import { getConnectionToken, InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Product, ProductSchema } from './tenat-product.schema';

@Injectable()
export class TenantProductService {
  constructor(
    @InjectConnection('tenant') private connection: Connection,
    @Inject('PRODUCT_MODAL') private productModalFromProvider: Model<Product>,
  ) {}

  async getTenantConnection(tenantId: string) {
    return this.connection.useDb(`tenant_${tenantId}`);
  }

  async getProduct_(tenantId: string) {
    const tenantConnection = await this.getTenantConnection(tenantId);

    console.log(tenantConnection.db.databaseName, 'databaseName');

    const productModal = await tenantConnection.model(
      Product.name,
      ProductSchema,
    );

    console.log(productModal, 'productModal');

    return productModal.find();
  }

  async getProduct(tenantId: string) {
    return this.productModalFromProvider.find();
  }

  async createProduct(body: any, tenantId: string) {
    const tenantConnection = await this.getTenantConnection(tenantId);

    const productModal = await tenantConnection.model(
      Product.name,
      ProductSchema,
    );

    const newProduct = await productModal.create(body);
    newProduct.save();

    return newProduct;
  }
}
