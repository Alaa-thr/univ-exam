import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsRepository,NotificationsController,NotificationsService } from 'notifications';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationsRepository])
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
