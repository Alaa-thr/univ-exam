import { LevelEntity } from "level/entities/level.entity";
import { ModuleEntity } from "modulee/entities/module.entity";
import { ISpecialityModuleLevel } from "speciality-module-level/interfaces/speciality-module-level.interface";
import { SpecialityEntity } from "speciality/entities/speciality.entity";
import { Entity, CreateDateColumn, UpdateDateColumn,  ManyToOne } from "typeorm";

@Entity('speciality_module_level')
export class SpecialityModuleLevelEntity implements ISpecialityModuleLevel{

    @ManyToOne(
        () => SpecialityEntity, 
        speciality => speciality.specialityModuleLevels, 
        { 
            primary: true,
            eager: true,
        }
    )
    speciality: SpecialityEntity;

    @ManyToOne(
        () => LevelEntity,
        level => level.specialityModuleLevels, 
        { 
            primary: true,
            eager: true,
        }
    )
    level: LevelEntity;

    @ManyToOne(
        () => ModuleEntity,
        module => module.specialityModuleLevels, 
        { 
            primary: true,
            eager: true,
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
