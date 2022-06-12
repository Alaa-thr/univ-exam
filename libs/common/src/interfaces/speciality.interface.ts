import { ISpecialityModuleLevel } from "./speciality-module-level.interface";
import { IStudent } from "./student.interface";

export interface ISpeciality{
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    specialityModuleLevels: ISpecialityModuleLevel[];
    students: IStudent[];
}