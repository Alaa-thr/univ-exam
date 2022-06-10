import { ILevel } from "level/interfaces/level.interface";
import { IModule } from "modulee/interfaces/module.interface";
import { ISpeciality } from "speciality/interfaces/speciality.interface";

export interface ISpecialityModuleLevel{

    created_at: Date;
    updated_at: Date;
    speciality: ISpeciality;
    level: ILevel;
    module: IModule;
}