import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class QueryDto {
  @IsOptional()
  @Transform((value) => value.value.split("'").join(''))
  keyword?: string;

  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  order?: string;
}
