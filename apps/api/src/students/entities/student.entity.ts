import { PersonNotificationEntity } from "shared";
import { Column, Entity } from "typeorm";

@Entity('students')
export class StudentEntity extends PersonNotificationEntity{

    @Column({
        unique: true,
        nullable: false
    })
    studentNumber: number;
}
