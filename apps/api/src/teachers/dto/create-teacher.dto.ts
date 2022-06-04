import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsAlpha, IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { IStudent } from 'students/interface/student.interface';
import { ITeacher } from 'teachers/interface/teacher.interface';

export class CreateTeacherDto
  implements Omit<ITeacher, 'id' | 'created_at' | 'updated_at'>
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
