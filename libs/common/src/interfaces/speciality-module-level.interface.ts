import { ILevel } from "./level.interface";
import { IModule } from "./module.interface";
import { ISpeciality } from "./speciality.interface";


export interface ISpecialityModuleLevel{

    created_at: Date;
    updated_at: Date;
    speciality: ISpeciality;
    level: ILevel;
    module: IModule;
}