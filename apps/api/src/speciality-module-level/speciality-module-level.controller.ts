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
import { ApiTags } from '@nestjs/swagger';
import { QueryDto } from 'shared';
import { CreateSpecialityModuleLevelDto } from './dto/create-speciality-module-level.dto';
import { UpdateSpecialityModuleLevelDto } from './dto/update-speciality-module-level.dto';
import { SpecialityModuleLevelService } from './speciality-module-level.service';

@Controller('speciality-module-level')
@ApiTags('Speciality Module Level')
export class SpecialityModuleLevelController {
  constructor(private readonly specialityModuleLevelService: SpecialityModuleLevelService) {}

  @Post()
  create(@Body() createSpecialityModuleLevelDto: CreateSpecialityModuleLevelDto) {
    return this.specialityModuleLevelService.create(createSpecialityModuleLevelDto);
  }

  @Get(':id')
  findBySpeciality(@Param('id') id: string) {
    return this.specialityModuleLevelService.findBySpeciality(id);
  }


  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSpecialityModuleLevelDto: UpdateSpecialityModuleLevelDto
  ) {
    return this.specialityModuleLevelService.update(id, updateSpecialityModuleLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialityModuleLevelService.remove(id);
  }
}
