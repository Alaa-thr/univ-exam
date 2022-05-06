import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthService,UsersRepository,UsersController,UsersService } from 'users';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { StudentsModule } from 'students/students.module';
import { TokenValidationStrategy } from './strategy/token-validation.strategy';

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
    }),
    StudentsModule   
  ],
  controllers: [UsersController],
  providers: [UsersService, UserAuthService,TokenValidationStrategy],
})
export class UsersModule {}
