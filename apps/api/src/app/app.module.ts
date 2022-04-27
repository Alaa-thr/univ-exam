import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmOptions } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmOptions),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
