import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IQuery } from 'shared/interfaces';

export class QueryDto implements IQuery {
  @ApiPropertyOptional()
  @IsOptional()
  @Transform((value) => value.value.split("'").join(''))
  keyword: string;
  @ApiPropertyOptional()
  @IsOptional()
  page: number;
  @ApiPropertyOptional()
  @IsOptional()
  limit: number;
  @ApiPropertyOptional()
  @IsOptional()
  order: string;
}
