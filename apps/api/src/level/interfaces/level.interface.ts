import { IStudent } from "students/interface/student.interface";

export interface ILevel{
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    students: IStudent[];
}