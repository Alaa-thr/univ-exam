import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ExamTypeService } from './exam-type.service';
import { CreateExamTypeDto } from './dto/create-exam-type.dto';
import { UpdateExamTypeDto } from './dto/update-exam-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { IExamType } from './interface/exam-type.interface';
import { QueryDto } from 'shared';

@Controller('exam-type')
@ApiTags('ExamType')
export class ExamTypeController {
  constructor(private readonly examTypeService: ExamTypeService) {}

  @Post()
  create(@Body() createExamTypeDto: CreateExamTypeDto) {
    return this.examTypeService.create(createExamTypeDto);
  }

  @Get()
  async findAll(@Query() query: QueryDto) {
    return await this.examTypeService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examTypeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExamTypeDto: UpdateExamTypeDto
  ) {
    return this.examTypeService.update(id, updateExamTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examTypeService.remove(id);
  }
}
