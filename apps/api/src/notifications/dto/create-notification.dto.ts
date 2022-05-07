import { UserEntity } from "@users";
import { IsNotEmpty } from "class-validator";
import { INotification } from "notifications/interface/notifications.interface";

export class CreateNotificationDto implements Omit<INotification, 'id'|'created_at'|'updated_at'>{
    
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    user: UserEntity;
}
