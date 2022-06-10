import { PartialType } from '@nestjs/swagger';
import { CreateSpecialityModuleLevelDto } from './create-speciality-module-level.dto';

export class UpdateSpecialityModuleLevelDto extends PartialType(CreateSpecialityModuleLevelDto) {}
