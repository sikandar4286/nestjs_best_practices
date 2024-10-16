import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TenantProductService } from './tenant-product.service';
import { TenantProductController } from './tenant-product.controller';
import { TenantMiddleWare } from 'src/middleware/tenant.middleware';
import { TenantConnectionProvider } from 'src/providers/tenant-connection-provider';
import { TenantsService } from 'src/tenants/tenants.service';
import { TenantModalProvider } from 'src/providers/tenant-model-provider';
import { TenantsModule } from 'src/tenants/tenants.module';

@Module({
  controllers: [TenantProductController],
  providers: [
    TenantProductService,
    TenantConnectionProvider,
    TenantModalProvider.productModal,
    TenantsService,
  ],
  imports: [TenantsModule],
})
export class TenantProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleWare).forRoutes(TenantProductController);
  }
}
