
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './app/config/swagger.config';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const corsOption = {
    origin: ['http://localhost:4202']
  }
  app.enableCors(corsOption);

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger-test', app, document);
  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true
  }))
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || process.env.APP_PORT;
  await app.listen(port);


  
}

bootstrap();
