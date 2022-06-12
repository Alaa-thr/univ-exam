import { IExam } from "./exam.interface";
import { ISpecialityModuleLevel } from "./speciality-module-level.interface";

export interface IModule{
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    exams: IExam[];
    specialityModuleLevels: ISpecialityModuleLevel[];
}