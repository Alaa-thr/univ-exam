import { StudentExamEntity } from 'exams/entities/studentExam.entity';
import { Person } from 'shared';
import { IStudent } from 'students/interface/student.interface';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('students')
export class StudentEntity extends Person implements IStudent {
  @Column({
    type: 'bigint',
    unique: true,
    nullable: false,
  })
  studentNumber: number;

  @OneToMany(() => StudentExamEntity, (studentExam) => studentExam.student, {
    onDelete: 'NO ACTION',
  })
  studentExams: StudentExamEntity[];
}
