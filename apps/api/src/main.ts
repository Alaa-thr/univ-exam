import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './app/config/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { globalInterceptors } from 'shared/interceptors';
import * as csurf from 'csurf';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path'

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '/../../../uploads'),{prefix:'/uploads'});
  const globalPrefix = 'api';
  const corsOption = {
    origin: '*',
  };
  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
  app.enableCors(corsOption);
  app.setGlobalPrefix(globalPrefix);
  //app.use(csurf());
  
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
    })
  );
  app.useGlobalInterceptors(...globalInterceptors);
  const port = process.env.PORT || process.env.APP_PORT;
  await app.listen(port);
}

bootstrap();
