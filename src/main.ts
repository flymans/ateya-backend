import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const allowedOrigins =
    configService.get('NODE_ENV') === 'production'
      ? ['https://ateya.surge.sh']
      : ['https://ateya.surge.sh', 'http://localhost:3000'];

  app.enableCors({
    origin: allowedOrigins,
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
