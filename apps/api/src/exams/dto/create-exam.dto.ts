import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { ExamTypeEnum } from 'exam-type/emun/exam-type.enum';
import { IExam } from 'exams';
import { CreateQuestionDto } from './create-question.dto';

export class CreateExamDto implements Omit< IExam, 'id'| 'created_at'| 'updated_at'| 'teacher'| 'examType'| 'questions'| 'studentExams'|'module'>
{
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  date: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  startHour: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  endHour: Date;

  @ApiProperty()
  @Type(() => Boolean)
  @IsBoolean()
  isPublished: boolean;

  @ApiProperty()
  @IsEnum(ExamTypeEnum)
  examType: string;

  @ApiProperty()
  @Type(() => Boolean)
  @IsBoolean()
  answersArePublished: boolean;

  @ApiProperty()
  @Type(() => CreateQuestionDto)
  @ValidateNested({ each: true })
  questions: CreateQuestionDto[];

}
