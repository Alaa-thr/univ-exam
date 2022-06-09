import { SpecialityEntity } from "speciality/entities/speciality.entity";
import { StudentEntity } from "students/entities/student.entity";

export interface ILevel{
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    specialities: SpecialityEntity[];
    students: StudentEntity[];
}