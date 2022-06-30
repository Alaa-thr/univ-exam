import { ExamTypeEnum } from "exam-type/emun/exam-type.enum";
import { QuestionEntity } from "exams/entities/question.entity";
import { InputTypeEnum } from "input-type/enum/input-type.enum";
import { IInputType } from "input-type/interface/input-type.interface";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('input_type')
export class InputTypeEntity implements IInputType {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        // type: 'enum',
        // enum: InputTypeEnum,
        // default: InputTypeEnum.CHECKBOX,
        nullable: true,
        unique: true
    })
    type: string;

    @CreateDateColumn({
        update: false,
    })
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(
        () => QuestionEntity,
        (question) => question.inputType
    )
    questions: QuestionEntity[];

}
