import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import { CustomerModule } from './customer/customer.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { TenantsModule } from './tenants/tenants.module';
import { TenantProductModule } from './tenant-product/tenant-product.module';

@Module({
  imports: [
    PaymentModule,
    CustomerModule,
    ConfigModule.forRoot({
      cache: false,
      isGlobal: true,
      load: [config],
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      connectionName: 'test',
      useFactory: async (configService: ConfigService) => {
        // const uri = await configService.get('MONGODB_URI_TEST_DB');
        const uri = await configService.get('MONGODB_URI');

        console.log(uri, 'uri_test');

        return { uri };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      connectionName: 'tenant',
      useFactory: async (configService: ConfigService) => {
        const uri = await configService.get('MONGODB_URI_TENANT_DB');
        // const uri = await configService.get('MONGODB_URI');
        console.log(uri, 'uri_tenant');

        return { uri };
      },
      inject: [ConfigService],
    }),
    ProductModule,
    TenantsModule,
    TenantProductModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('customer');
  }
}
