import { IsAlpha, IsDate, IsNotEmpty, IsNumber } from "class-validator";
import { IStudent } from "students/interface/student.interface";

export class CreateStudentDto implements Omit<IStudent, 'id'|'created_at'|'updated_at'>{

    @IsNotEmpty()
    @IsAlpha()
    fistName: string;

    @IsNotEmpty()
    @IsAlpha()
    lastName: string;

    @IsNotEmpty()
    @IsNumber()
    phoneNumber: number;

    @IsNotEmpty()
    @IsDate()
    birthDate: Date;

    @IsNotEmpty()
    @IsNumber()
    studentNumber: number;
}
