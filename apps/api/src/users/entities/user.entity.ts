import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true,
        nullable: false
    })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({
        update: false
    })
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}
