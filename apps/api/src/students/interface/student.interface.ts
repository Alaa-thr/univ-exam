import { UserEntity } from "@users";

export interface IStudent {
    
    id: string;
    fistName: string;
    lastName: string;
    phoneNumber: number;
    birthDate: Date;
    created_at: Date;
    updated_at: Date;
    user: UserEntity;
    studentNumber: number;
}
