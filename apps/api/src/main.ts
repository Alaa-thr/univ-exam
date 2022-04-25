
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './app/config/swagger.config';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger-test', app, document);
  
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || process.env.APP_PORT;
  await app.listen(port);


  
}

bootstrap();
