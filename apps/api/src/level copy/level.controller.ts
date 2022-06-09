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
import { LevelService } from './level.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { ApiTags } from '@nestjs/swagger';
import { QueryDto } from 'shared';

@Controller('level')
@ApiTags('Level')
export class LevelController {
  constructor(private readonly specialityService: LevelService) {}

  @Post()
  create(@Body() createLevelDto: CreateLevelDto) {
    return this.specialityService.create(createLevelDto);
  }

  @Get()
  findAll(@Query() query: QueryDto) {
    return this.specialityService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specialityService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLevelDto: UpdateLevelDto
  ) {
    return this.specialityService.update(id, updateLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialityService.remove(id);
  }
}
