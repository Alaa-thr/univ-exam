import { Person } from 'shared';
import { ITeacher } from 'teachers/interface/teacher.interface';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('teachers')
export class TeacherEntity extends Person implements ITeacher {}
