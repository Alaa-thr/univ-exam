import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ILevel } from "level/interfaces/level.interface";
import { IModule } from "modulee/interfaces/module.interface";
import { ISpecialityModuleLevel } from "speciality-module-level/interfaces/speciality-module-level.interface";
import { ISpeciality } from "speciality/interfaces/speciality.interface";

export class CreateSpecialityModuleLevelDto implements Omit<ISpecialityModuleLevel, 'id'|'created_at'|'updated_at'>{

    @IsNotEmpty()
    speciality: ISpeciality;

    @IsNotEmpty()
    level: ILevel;

    @IsNotEmpty()
    module: IModule;
  
}
