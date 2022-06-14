import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { IExam } from "exams/interfaces/exam.interface";
import { IStudentExam } from "exams/interfaces/student-exam.interface";
import { CreateStudentDto } from "students/dto/create-student.dto";
import { IStudent } from "students/interface/student.interface";
import { CreateExamDto } from "./create-exam.dto";

export class CreateExamStudentDto implements  Omit<IStudentExam, 'created_at'|'updated_at'|'student'|'exam'>{ 
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    grade: number;

    @ApiProperty()
    @Type(() => Boolean)
    @IsBoolean()
    @IsOptional()
    isDone: boolean;

    @ApiProperty()
    @IsOptional()
    videoPath: string;

    @ApiProperty()
    @ValidateNested({ each: true })
    student: IStudent;

    @ApiProperty()
    @ValidateNested({ each: true })
    exam: IExam;
}
