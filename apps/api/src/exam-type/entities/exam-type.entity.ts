import { ExamTypeEnum } from 'exam-type/emun/exam-type.enum';
import { ExamEntity } from 'exams';
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Entity } from 'typeorm';
import {IExamType} from '../interface/exam-type.interface'

@Entity('exam_type')
export class ExamTypeEntity implements IExamType{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ExamTypeEnum,
    default: ExamTypeEnum.EXAM,
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
      () => ExamEntity,
      (exam) => exam.examType
  )
  exams: ExamEntity[];
}
