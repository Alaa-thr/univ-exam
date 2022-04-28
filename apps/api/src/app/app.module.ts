import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from 'students';
import { UsersModule } from 'users';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmOptions } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmOptions),
    UsersModule,
    StudentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
