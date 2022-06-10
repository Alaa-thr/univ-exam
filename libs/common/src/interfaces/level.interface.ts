import { IStudent } from "./student.interface";

export interface ILevel{
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    students: IStudent[];
}