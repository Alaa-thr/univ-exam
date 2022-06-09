import { ISpeciality } from "speciality/interfaces/speciality.interface";
import { StudentEntity } from "students/entities/student.entity";
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

    @OneToMany(() => StudentEntity, student => student.level)
    students: StudentEntity[];
}
