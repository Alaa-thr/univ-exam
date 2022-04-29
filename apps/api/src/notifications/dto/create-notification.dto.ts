import { UserEntity } from "@users";

export class CreateNotificationDto {
    
    description: string;
    user: UserEntity;
}
