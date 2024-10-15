import { Logger, Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config/config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // JwtModule.register({
    //   global: false,
    //   // global: true,
    //   secret: 'cndjlcndjnuJHCSDKCNDLKJ989899VFVFCD8989',
    //   signOptions: { expiresIn: '60s' },
    // }),
    // JwtModule.registerAsync({
    //   useFactory: async (configService: ConfigService) => ({
    //     global: false,
    //     secret: configService.get('SECRET_KEY'),
    //     signOptions: { expiresIn: '60s' },
    //   }),
    //   inject: [ConfigService],
    // }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: false,
        secret: configService.get('SECRET_KEY'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, Logger],
})
export class CustomerModule {}
