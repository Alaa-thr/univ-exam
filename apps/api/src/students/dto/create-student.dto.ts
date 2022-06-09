import { Type } from 'class-transformer';
import { IsAlpha, IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { IStudent } from 'students/interface/student.interface';

export class CreateStudentDto
  implements Omit<IStudent, 'id' | 'created_at' | 'updated_at' | 'level' | 'speciality'>
{
  @IsNotEmpty()
  @IsAlpha()
  firstName: string;

  @IsNotEmpty()
  @IsAlpha()
  lastName: string;

  @IsNotEmpty()
  @IsNumber()
  phoneNumber: number;

  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  birthDate: Date;

  @IsNotEmpty()
  @IsNumber()
  studentNumber: number;
}
