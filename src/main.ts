import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ConfigService } from '@nestjs/config';
import { appSettings } from './setting';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const configService = app.get(ConfigService);
  await app.listen(3000);
  app.use(express.json());
  appSettings(app);
}
bootstrap();
