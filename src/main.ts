import './tracing';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@infrastructure/config/app.config';
import { ValidationPipe } from '@nestjs/common';
import { ValidationConfig } from '@infrastructure/config/validation.config';
import { TracingInterceptor } from './tracing.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const { port, globalPrefix } = AppConfig(configService);
  // app.useGlobalInterceptors(new TracingInterceptor());
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe(ValidationConfig));
  await app.listen(port);
}
bootstrap();
