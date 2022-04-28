import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthService,UsersRepository,UsersController,UsersService } from 'users';
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
