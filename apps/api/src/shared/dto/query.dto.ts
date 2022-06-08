import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
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
