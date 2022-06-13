import { Type } from 'class-transformer';
import { IsAlpha, IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { ILevel } from 'level/interfaces/level.interface';
import { ISpeciality } from 'speciality/interfaces/speciality.interface';
import { IStudent } from 'students/interface/student.interface';

export class CreateStudentDto
  implements Omit<IStudent, 'id' | 'created_at' | 'updated_at'>
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

  @IsNotEmpty()
  level: ILevel;

  @IsNotEmpty()
  speciality: ISpeciality;
}
