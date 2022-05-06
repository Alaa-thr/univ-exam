
import { ExamEntity } from "exams";
import { InputTypeEnum } from "exams/enum/input-type.enum";
import { IQuestion } from "exams/interfaces/question.interface";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('questions')
export class QuestionEntity implements IQuestion{

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
        exam => exam.questions,
        { 
            onDelete: 'CASCADE' 
        }
    )
    @JoinColumn()
    exam: ExamEntity;
 
}
