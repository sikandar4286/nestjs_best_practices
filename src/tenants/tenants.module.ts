import { Global, Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantMaster, TenantMasterSchema } from './tenant.schema';

// @Global()
@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: TenantMaster.name, schema: TenantMasterSchema }],
      'tenant',
    ),
  ],
  controllers: [TenantsController],
  providers: [TenantsService],
  exports: [MongooseModule, TenantsService],
})
export class TenantsModule {}
