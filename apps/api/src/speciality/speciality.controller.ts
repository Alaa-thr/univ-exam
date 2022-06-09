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
import { SpecialityService } from './speciality.service';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { ApiTags } from '@nestjs/swagger';
import { QueryDto } from 'shared';

@Controller('speciality')
@ApiTags('Speciality')
export class SpecialityController {
  constructor(private readonly specialityService: SpecialityService) {}

  @Post()
  create(@Body() createSpecialityDto: CreateSpecialityDto) {
    return this.specialityService.create(createSpecialityDto);
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
    @Body() updateSpecialityDto: UpdateSpecialityDto
  ) {
    return this.specialityService.update(id, updateSpecialityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialityService.remove(id);
  }
}
