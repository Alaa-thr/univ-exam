import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { UserAuthService } from './user-auth.service';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions:{
        algorithm: 'HS512',
        expiresIn: '1d',
      }
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, UserAuthService],
})
export class UsersModule {}
