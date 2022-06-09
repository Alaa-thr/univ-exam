import { StudentExamEntity } from 'exams/entities/studentExam.entity';
import { LevelEntity } from 'level/entities/level.entity';
import { Person } from 'shared';
import { SpecialityEntity } from 'speciality/entities/speciality.entity';
import { IStudent } from 'students/interface/student.interface';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

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

  @ManyToOne(() => LevelEntity, level => level.students)
  level: LevelEntity;

  @ManyToOne(() => SpecialityEntity, speciality => speciality.students)
  speciality: SpecialityEntity;
}
