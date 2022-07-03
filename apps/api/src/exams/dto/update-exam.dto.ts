import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsDate,
  IsBoolean,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { CreateExamDto } from 'exams';
import { ISpecialityModuleLevel } from 'speciality-module-level/interfaces/speciality-module-level.interface';
import { CreateStudentDto } from 'students/dto/create-student.dto';
import { CreateQuestionDto } from './create-question.dto';

export class UpdateExamDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  specialityModuleLevel: ISpecialityModuleLevel;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  date: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsOptional()
  startHour: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsOptional()
  endHour: Date;

  @ApiProperty()
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isPublished: boolean;

  @ApiProperty()
  @IsOptional()
  examType: string;

  @ApiProperty()
  @Type(() => CreateQuestionDto)
  @ValidateNested({ each: true })
  @IsOptional()
  questions: CreateQuestionDto[];

  @ApiProperty()
  @Type(() => CreateStudentDto)
  @IsOptional()
  students: CreateStudentDto[];
}
