
import { ExamTypeEntity } from 'exam-type/entities/exam-type.entity';
import { IExam } from 'exams/interfaces/exam.interface';
import { ModuleEntity } from 'modulee/entities/module.entity';
import { SpecialityModuleLevelEntity } from 'speciality-module-level/entities/speciality-module-level.entity';
import { TeacherEntity } from 'teachers/entities/teacher.entity';
import { ITeacher } from 'teachers/interface/teacher.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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
    default: false,
  })
  answersArePublished: boolean;

  @CreateDateColumn({
    update: false,
  })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => ExamTypeEntity, (examType) => examType.exams)
  examType: ExamTypeEntity;

  @OneToMany(() => QuestionEntity, (question) => question.exam)
  questions: QuestionEntity[];

  @OneToMany(() => StudentExamEntity, (studentExam) => studentExam.exam)
  studentExams: StudentExamEntity[];

  @ManyToOne(() => TeacherEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  teacher: TeacherEntity;

  @ManyToOne(
    () => SpecialityModuleLevelEntity, 
    (specialityModuleLevel) => specialityModuleLevel.exams, 
    {
      onDelete: 'CASCADE',
    }
  )
  @JoinColumn()
  specialityModuleLevel: SpecialityModuleLevelEntity;
}
