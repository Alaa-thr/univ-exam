
import { ILevel } from "level/interfaces/level.interface";
import { SpecialityEntity } from "speciality/entities/speciality.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";

@Entity('level')
export class LevelEntity implements ILevel {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true
    })
    name: string;

    @CreateDateColumn({
        update: false,
    })
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToMany(() => SpecialityEntity)
    @JoinTable()
    specialities: SpecialityEntity[];

}
