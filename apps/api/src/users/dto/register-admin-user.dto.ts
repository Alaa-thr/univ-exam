import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { IUser } from 'users/interface/user.interface';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAdminDto } from 'admins/dto/create-admin.dto';

export class RegisterAdminUserDto
  implements Omit<IUser, 'id' | 'created_at' | 'updated_at' | 'admin'>
{
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 12)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: "Password is too weak, choose a stronger password between 6 and 12 characters"
    })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => CreateAdminDto)
  admin: CreateAdminDto;
}
