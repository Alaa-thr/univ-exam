import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamsModule } from 'exams';
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
    ExamsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
