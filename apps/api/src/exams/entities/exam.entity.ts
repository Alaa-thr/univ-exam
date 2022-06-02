import { ExamTypeEnum } from 'exams/enum/exam-type.enum';
import { IExam } from 'exams/interfaces/exam.interface';
import { TeacherEntity } from 'teachers/entities/teacher.entity';
import { ITeacher } from 'teachers/interface/teacher.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { QuestionEntity } from './question.entity';
import { StudentExamEntity } from './studentExam.entity';

@Entity('exams')
export class ExamEntity implements IExam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  title: string;

  @Column('date')
  date: Date;

  @Column('time')
  startHour: Date;

  @Column('time')
  endHour: Date;

  @Column({
    default: false,
  })
  isPublished: boolean;

  @Column({
    type: 'enum',
    enum: ExamTypeEnum,
    default: ExamTypeEnum.EXAM,
  })
  examType: string;

  @Column({
    default: false,
  })
  answersArePublished: boolean;

  @CreateDateColumn({
    update: false,
  })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => QuestionEntity, (question) => question.exam)
  questions: QuestionEntity[];

  @OneToMany(() => StudentExamEntity, (studentExam) => studentExam.exam)
  studentExams: StudentExamEntity[];

  @OneToOne(() => TeacherEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  teacher: TeacherEntity;
}
