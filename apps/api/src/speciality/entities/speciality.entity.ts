import { SpecialityModuleLevelEntity } from "speciality-module-level/entities/speciality-module-level.entity";
import { ISpeciality } from "speciality/interfaces/speciality.interface";
import { StudentEntity } from "students/entities/student.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";

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

    @OneToMany(() => SpecialityModuleLevelEntity, (specialityModuleLevel) => specialityModuleLevel.speciality)
    specialityModuleLevels: SpecialityModuleLevelEntity[];

    @OneToMany(() => StudentEntity, student => student.level)
    students: StudentEntity[];
}
