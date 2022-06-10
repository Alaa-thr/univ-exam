import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches } from "class-validator";
import { ISpecialityModuleLevel } from "speciality-module-level/interfaces/speciality-module-level.interface";

export class CreateSpecialityModuleLevelDto implements Omit<ISpecialityModuleLevel, 'id'|'created_at'|'updated_at' | 'speciality' | 'level' | 'module'>{

  
}
