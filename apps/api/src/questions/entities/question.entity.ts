
import { ExamEntity } from "exams";
import { InputTypeEnum } from "questions/enum/input-type.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('questions')
export class QuestionEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: false
    })
    text: string;

    @Column({
        type: 'enum',
        enum: InputTypeEnum,
        default: InputTypeEnum.CHECKBOX
    })
    inputType: InputTypeEnum;

    @CreateDateColumn({
        update: false
    })
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(
        () => ExamEntity,
        { 
            onDelete: 'CASCADE' 
        }
    )
    @JoinColumn()
    exam: ExamEntity;
 
}
