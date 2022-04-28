import { PersonEntity } from "shared";
import { Column, Entity } from "typeorm";

@Entity('students')
export class StudentEntity extends PersonEntity{

    @Column({
        unique: true,
        nullable: false
    })
    studentNumber: number;
}
