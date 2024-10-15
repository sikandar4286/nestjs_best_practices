import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { middleware1 } from './middleware/middleware1';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(middleware1);
  // app.useGlobalPipes(
  //   new ValidationPipe({ disableErrorMessages: true, whitelist: true }),
  // );
  const config = app.get(ConfigService);

  await app.listen(config.get('port') || 3000);
}
bootstrap();
