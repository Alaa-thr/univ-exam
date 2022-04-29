import { UserEntity } from "@users";
import { Column, CreateDateColumn, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class Person {

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
}
