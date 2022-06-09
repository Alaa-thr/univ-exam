import { IExam } from "exams";
import { ILevel } from "level/interfaces/level.interface";

export interface IModule{
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    levels: ILevel[];
    exams: IExam[];
}