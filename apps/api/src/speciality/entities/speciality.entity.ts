import { ISpeciality } from "speciality/interfaces/speciality.interface";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('speciality')
export class SpecialityEntity implements ISpeciality {

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
}
