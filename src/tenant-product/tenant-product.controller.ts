import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { TenantProductService } from './tenant-product.service';
import { Connection } from 'mongoose';

@Controller('tenant-product')
export class TenantProductController {
  constructor(
    private readonly tenantProductService: TenantProductService,
    @Inject('TENANT_CONNECTION') private tenantConnection: Connection,
  ) {
    console.log('inside controller (tenant-product)');
  }

  @Get('test')
  getConnectionName() {
    return this.tenantConnection.db.databaseName;
  }

  @Get()
  getProduct(@Req() { tenantId }) {
    // return this.tenantConnection.db.databaseName;
    return this.tenantProductService.getProduct(tenantId);
  }

  @Post()
  createProduct(@Req() { tenantId }, @Body() body: any) {
    // return this.tenantConnection.db.databaseName;
    return this.tenantProductService.createProduct(body, tenantId);
  }
}
