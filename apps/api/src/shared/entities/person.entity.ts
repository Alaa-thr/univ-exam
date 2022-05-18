import { UserEntity } from "@users";
import { Column, CreateDateColumn, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class Person {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: false
    })
    firstName: string;

    @Column({
        nullable: false
    })
    lastName: string;

    @Column({
        type: 'bigint',
        nullable: false,
        unique: true
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
}
