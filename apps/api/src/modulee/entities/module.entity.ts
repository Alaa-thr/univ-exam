
import { ExamEntity } from "exams";
import { LevelEntity } from "level/entities/level.entity";
import { IModule } from "modulee/interfaces/module.interface";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";

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

    @ManyToMany(() => LevelEntity)
    @JoinTable()
    levels: LevelEntity[];

    @OneToMany(() => ExamEntity, (exam) => exam.module)
    exams: ExamEntity[];
}
