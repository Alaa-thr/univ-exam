import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { IAnswer } from 'exams/interfaces/answer.interface';

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
