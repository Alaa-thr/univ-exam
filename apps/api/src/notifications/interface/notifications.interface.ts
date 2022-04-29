import { UserEntity } from "@users";

export interface INotification{
    
    id: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    user: UserEntity;
}
