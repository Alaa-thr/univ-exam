import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { NotificationEntity, INotification } from "notifications";

@Injectable()
@EntityRepository(NotificationEntity)
export class NotificationsRepository extends Repository<NotificationEntity>{

    async findAll(userId: string): Promise<INotification[]>{
        try{
            return await this.find({where: {user: userId}});
        }catch(error){
            console.log('notification repo error', error)
            throw new InternalServerErrorException("Something went wrong, notification cannot be recoverd.") 
        }
    }

    async removeNotif(userId: string, notifId: string): Promise<INotification>{
        try{
            const notif = await this.findOne(notifId, {where: {user: userId}});
            if(!notif){
                throw new NotFoundException(`this id ${notifId} is not found !`)
            }
            return await this.remove(notif);
        }catch(error){
            console.log('notification repo error', error)
            throw new InternalServerErrorException("Something went wrong, notification cannot be deleted.") 
        }    
    }
}