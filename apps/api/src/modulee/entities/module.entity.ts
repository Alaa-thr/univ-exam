
import { ExamEntity } from "exams";
import { IModule } from "modulee/interfaces/module.interface";
import { SpecialityModuleLevelEntity } from "speciality-module-level/entities/speciality-module-level.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity('module')
export class ModuleEntity implements IModule {

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

    @OneToMany(() => SpecialityModuleLevelEntity, (specialityModuleLevel) => specialityModuleLevel.module, {onDelete: 'CASCADE'})
    specialityModuleLevels: SpecialityModuleLevelEntity[];
}
