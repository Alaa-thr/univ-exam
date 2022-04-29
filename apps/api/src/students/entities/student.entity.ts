import { UserEntity } from "@users";
import { Person } from "shared";
import { IStudent } from "students/interface/student.interface";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('students')
export class StudentEntity  {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: false
    })
    fistName: string;

    @Column({
        nullable: false
    })
    lastName: string;

    @Column({
        nullable: false
    })
    phoneNumber: number;

    @Column({
        nullable: false
    })
    birthDate: Date;

    @CreateDateColumn({
        update: false
    })
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => UserEntity, user=>user.student)
    @JoinColumn()
    user: UserEntity;

    @Column({
        unique: true,
        nullable: false
    })
    studentNumber: number;
}
