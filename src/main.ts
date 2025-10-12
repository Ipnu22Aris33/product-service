import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@infrastructure/config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const { port, globalPrefix } = AppConfig(configService);
  app.setGlobalPrefix(globalPrefix);

  await app.listen(port);
}
bootstrap();
