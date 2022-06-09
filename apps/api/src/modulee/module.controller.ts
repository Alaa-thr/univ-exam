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
import { ModuleService } from './module.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { ApiTags } from '@nestjs/swagger';
import { QueryDto } from 'shared';

@Controller('module')
@ApiTags('Module')
export class ModuleController {
  constructor(private readonly specialityService: ModuleService) {}

  @Post()
  create(@Body() createModuleDto: CreateModuleDto) {
    return this.specialityService.create(createModuleDto);
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
    @Body() updateModuleDto: UpdateModuleDto
  ) {
    return this.specialityService.update(id, updateModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialityService.remove(id);
  }
}
