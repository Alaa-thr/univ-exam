import { Type } from 'class-transformer';
import { IsAlpha, IsDate, IsNotEmpty, IsNumber, Matches } from 'class-validator';
import { ILevel } from 'level/interfaces/level.interface';
import { ISpeciality } from 'speciality/interfaces/speciality.interface';
import { IStudent } from 'students/interface/student.interface';

export class CreateStudentDto
  implements Omit<IStudent, 'id' | 'created_at' | 'updated_at'>
{
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9 ]+$/,{
    message: "the name need to have only letters and numbers"
  })
  firstName: string;

  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9 ]+$/,{
    message: "the name need to have only letters and numbers"
  })
  lastName: string;

  @IsNotEmpty()
  @Matches(/^[0-9 ]+$/,{
    message: "the phone number need to have only numbers"
  })
  phoneNumber: number;

  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  birthDate: Date;

  @IsNotEmpty()
  @Matches(/^[0-9 ]+$/,{
    message: "the student number need to have only numbers"
  })
  studentNumber: number;

  @IsNotEmpty()
  level: ILevel;

  @IsNotEmpty()
  speciality: ISpeciality;
}
