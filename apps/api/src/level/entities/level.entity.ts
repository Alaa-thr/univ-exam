
import { ILevel } from "level/interfaces/level.interface";
import { SpecialityModuleLevelEntity } from "speciality-module-level/entities/speciality-module-level.entity";
import { StudentEntity } from "students/entities/student.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

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

    @OneToMany(() => SpecialityModuleLevelEntity, (specialityModuleLevel) => specialityModuleLevel.level)
    specialityModuleLevels: SpecialityModuleLevelEntity[];

    @OneToMany(() => StudentEntity, student => student.level)
    students: StudentEntity[];

}
