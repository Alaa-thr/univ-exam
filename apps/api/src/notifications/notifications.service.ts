import { Injectable } from '@nestjs/common';
import { UpdateNotificationDto,CreateNotificationDto,INotification,NotificationsRepository } from 'notifications';

@Injectable()
export class NotificationsService {

  constructor(
    private readonly notificationRepo: NotificationsRepository
  ){}
  create(createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }

  async findAll(userId: string):Promise<INotification[]> {
    return await this.notificationRepo.findAll(userId);
  }

  async remove(userId: string,notifId: string): Promise<boolean> {
    const deteledNotif = await this.notificationRepo.removeNotif(userId,notifId);
    if(deteledNotif){
      return true;
    }
    return false;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  
}
