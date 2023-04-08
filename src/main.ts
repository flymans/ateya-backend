import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: [configService.get('FRONTEND_URL')],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'Content-Type', 'Accept'],
    credentials: true,
  });

  const port = configService.get('PORT');
  await app.listen(port);
  const logger = new Logger('bootstrap');
  logger.log(`Application listens on the port: ${port}`);
}
bootstrap();
