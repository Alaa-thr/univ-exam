import { IStudent } from "students/interface/student.interface";

export interface ISpeciality{
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    students: IStudent[];
}