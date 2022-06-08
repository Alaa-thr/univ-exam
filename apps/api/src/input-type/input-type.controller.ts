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
import { InputTypeService } from './input-type.service';
import { CreateInputTypeDto } from './dto/create-input-type.dto';
import { UpdateInputTypeDto } from './dto/update-input-type.dto';
import { QueryDto } from 'shared';
import { ApiTags } from '@nestjs/swagger';

@Controller('input-type')
@ApiTags('InputType')
export class InputTypeController {
  constructor(private readonly inputTypeService: InputTypeService) {}

  @Post()
  create(@Body() createInputTypeDto: CreateInputTypeDto) {
    return this.inputTypeService.create(createInputTypeDto);
  }

  @Get()
  findAll(@Query() query: QueryDto) {
    return this.inputTypeService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inputTypeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInputTypeDto: UpdateInputTypeDto
  ) {
    return this.inputTypeService.update(id, updateInputTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inputTypeService.remove(id);
  }
}
