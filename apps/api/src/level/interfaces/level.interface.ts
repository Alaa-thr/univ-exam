import { ISpeciality } from "speciality/interfaces/speciality.interface";
import { IStudent } from "students/interface/student.interface";

export interface ILevel{
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    specialities: ISpeciality[];
    students: IStudent[];
}