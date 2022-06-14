import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { time } from 'cron';
import { ExamTypeEnum } from 'exam-type/emun/exam-type.enum';
import { IExam } from 'exams';
import { IModule } from 'modulee/interfaces/module.interface';
import { CreateStudentDto } from 'students/dto/create-student.dto';
import { CreateExamStudentDto } from './create-exam-student.dto';
import { CreateQuestionDto } from './create-question.dto';

export class CreateExamDto implements Omit< IExam, 'id'| 'created_at'| 'updated_at'| 'teacher'| 'examType'| 'questions'| 'studentExams'|'answersArePublished'>
{
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  module: IModule;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  date: Date;

  @ApiProperty()
  @Type(() => Date)
  startHour: Date;

  @ApiProperty()
  @Type(() => Date)
  endHour: Date;

  @ApiProperty()
  @Type(() => Boolean)
  @IsBoolean()
  isPublished: boolean;

  @ApiProperty()
  @IsEnum(ExamTypeEnum)
  examType: string;

  @ApiProperty()
  @Type(() => CreateQuestionDto)
  @ValidateNested({ each: true })
  questions: CreateQuestionDto[];

  @ApiProperty()
  @Type(() => CreateStudentDto)
  students: CreateStudentDto[];

}
