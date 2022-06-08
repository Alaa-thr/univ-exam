import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { InputTypeEnum } from 'exams/enum/input-type.enum';
import { IAnswer } from 'exams/interfaces/answer.interface';
import { IExam } from 'exams/interfaces/exam.interface';
import { IQuestion } from 'exams/interfaces/question.interface';
import { IStudent } from 'students/interface/student.interface';
import { CreateExamDto } from './create-exam.dto';

export class CreateAnswerDto
  implements
    Omit<IAnswer, 'id' | 'created_at' | 'updated_at' | 'question' | 'students'>
{
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @Type(() => Boolean)
  @IsBoolean()
  isCorrect: boolean;
}
