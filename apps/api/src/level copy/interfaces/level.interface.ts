import { SpecialityEntity } from "speciality/entities/speciality.entity";

export interface ILevel{
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    specialities: SpecialityEntity[];
}