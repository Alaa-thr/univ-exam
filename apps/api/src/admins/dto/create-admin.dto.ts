import { ApiProperty } from '@nestjs/swagger';
import { IAdmin } from 'admins/interface/admin.interface';
import { Type } from 'class-transformer';
import { IsAlpha, IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAdminDto
  implements Omit<IAdmin, 'id' | 'created_at' | 'updated_at'>
{
  @ApiProperty()
  @IsNotEmpty()
  @IsAlpha()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsAlpha()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  phoneNumber: number;

  @ApiProperty()
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  birthDate: Date;
}
