import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { InputTypeEnum } from 'exams/enum/input-type.enum';
import { IExam } from 'exams/interfaces/exam.interface';
import { IQuestion } from 'exams/interfaces/question.interface';
import { CreateAnswerDto } from './create-answer.dto';
import { CreateExamDto } from './create-exam.dto';

export class CreateQuestionDto
  implements
    Omit<IQuestion, 'id' | 'created_at' | 'updated_at' | 'exam' | 'inputType'>
{
  @ApiProperty()
  @IsNotEmpty()
  text: string;

  @ApiProperty()
  inputType: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  point: number;

  @ApiProperty()
  @Type(() => CreateAnswerDto)
  @ValidateNested({ each: true })
  answers: CreateAnswerDto[];
}
