import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { IUser } from 'users/interface/user.interface';
import { Type } from 'class-transformer';
import { CreateTeacherDto } from 'teachers/dto/create-teacher.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterTeacherUserDto
  implements Omit<IUser, 'id' | 'created_at' | 'updated_at' | 'teacher'>
{
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 12)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password is too weak, choose a stronger password between 6 and 12 characters',
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => CreateTeacherDto)
  teacher: CreateTeacherDto;
}
