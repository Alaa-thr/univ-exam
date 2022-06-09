import { StudentEntity } from "students/entities/student.entity";

export interface ISpeciality{
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    students: StudentEntity[];
}