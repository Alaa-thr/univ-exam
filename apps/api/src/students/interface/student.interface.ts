import { ILevel } from "level/interfaces/level.interface";
import { ISpeciality } from "speciality/interfaces/speciality.interface";

export interface IStudent {
    
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: number;
    birthDate: Date;
    created_at: Date;
    updated_at: Date;
    studentNumber: number;
    level: ILevel;
    speciality: ISpeciality;
}
