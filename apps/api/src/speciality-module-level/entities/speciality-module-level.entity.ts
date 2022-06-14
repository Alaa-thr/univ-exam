import { LevelEntity } from "level/entities/level.entity";
import { ModuleEntity } from "modulee/entities/module.entity";
import { ISpecialityModuleLevel } from "speciality-module-level/interfaces/speciality-module-level.interface";
import { SpecialityEntity } from "speciality/entities/speciality.entity";
import { Entity, CreateDateColumn, UpdateDateColumn,  ManyToOne, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity('speciality_module_level')
@Index(["speciality", "level", "module"], { unique: true })
export class SpecialityModuleLevelEntity implements ISpecialityModuleLevel{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(
        () => SpecialityEntity, 
        speciality => speciality.specialityModuleLevels, 
        { 
            nullable: false,
            eager: true,
            onDelete: 'CASCADE'
        }
    )
    speciality: SpecialityEntity;

    @ManyToOne(
        () => LevelEntity,
        level => level.specialityModuleLevels, 
        { 
            nullable: false,
            eager: true,
            onDelete: 'CASCADE'
        }
    )
    level: LevelEntity;

    @ManyToOne(
        () => ModuleEntity,
        module => module.specialityModuleLevels, 
        { 
            nullable: true,
            eager: true,
            onDelete: 'SET NULL'
        }
    )
    module: ModuleEntity;

    @CreateDateColumn({
        update: false
    })
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
