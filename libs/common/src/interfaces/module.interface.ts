import { IExam } from "./exam.interface";
import { ILevel } from "./level.interface";

export interface IModule{
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    levels: ILevel[];
    exams: IExam[];
}