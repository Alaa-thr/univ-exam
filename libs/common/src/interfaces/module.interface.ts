import { IExam } from "./exam.interface";

export interface IModule{
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    exams: IExam[];
}