
import { IAnswer } from "answers/interface/answer.interface";
import { QuestionEntity } from "questions";
import { StudentEntity } from "students/entities/student.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('answers')
export class AnswerEntity implements IAnswer{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: false
    })
    title: string;

    @Column({
        default: false
    })
    isCorrect: boolean;

    @CreateDateColumn({
        update: false
    })
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(
        () => QuestionEntity,
        { 
            onDelete: 'CASCADE' 
        }
    )
    @JoinColumn()
    question: QuestionEntity;

    @ManyToMany(() => StudentEntity)
    @JoinTable()
    students: StudentEntity[];
}
