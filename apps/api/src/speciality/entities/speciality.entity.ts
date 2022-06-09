import { QuestionEntity } from "exams/entities/question.entity";
import { InputTypeEnum } from "input-type/enum/input-type.enum";
import { ISpeciality } from "speciality/interfaces/speciality.interface";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

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
