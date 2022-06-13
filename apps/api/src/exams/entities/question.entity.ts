import { ExamEntity } from 'exams';
import { InputTypeEnum } from 'input-type/enum/input-type.enum';
import { IQuestion } from 'exams/interfaces/question.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AnswerEntity } from './answer.entity';
import { InputTypeEntity } from 'input-type/entities/input-type.entity';

@Entity('questions')
export class QuestionEntity implements IQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  text: string;

  @CreateDateColumn({
    update: false,
  })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({
    default: 0,
    type: "real"
  })
  point: number;

  @ManyToOne(() => ExamEntity, (exam) => exam.questions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  exam: ExamEntity;

  @OneToMany(() => AnswerEntity, (answer) => answer.question)
  answers: AnswerEntity[];

  @ManyToOne(() => InputTypeEntity, (inputType) => inputType.questions)
  inputType: InputTypeEntity;
}
