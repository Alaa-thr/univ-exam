import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { IQuestion } from 'exams/interfaces/question.interface';
import { CreateAnswerDto } from './create-answer.dto';

export class CreateQuestionDto implements Omit<IQuestion, 'id' | 'created_at' | 'updated_at' | 'exam' | 'inputType'| 'answers'>
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
