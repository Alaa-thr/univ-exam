import { LevelEntity } from "level/entities/level.entity";
import { SpecialityEntity } from "speciality/entities/speciality.entity";

export interface IStudent {
    
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: number;
    birthDate: Date;
    created_at: Date;
    updated_at: Date;
    studentNumber: number;
    level: LevelEntity;
    speciality: SpecialityEntity;
}
