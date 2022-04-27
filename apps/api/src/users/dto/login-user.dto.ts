import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { RegisterUserDto } from './register-user.dto';

export class LoginUserDto extends PartialType(RegisterUserDto) {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string
}
