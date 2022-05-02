import { UserEntity } from "@users";
import { Person } from "shared";
import { IStudent } from "students/interface/student.interface";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('students')
export class StudentEntity extends Person implements IStudent{

    @Column({
        type: 'bigint',
        unique: true,
        nullable: false
    })
    studentNumber: number;
}
