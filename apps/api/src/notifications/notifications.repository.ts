import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { NotificationEntity } from "notifications";

@Injectable()
@EntityRepository(NotificationEntity)
export class NotificationsRepository extends Repository<NotificationEntity>{}