import { AdminEntity } from 'admins/entities/admin.entity';
import { StudentEntity } from 'students/entities/student.entity';
import { TeacherEntity } from 'teachers/entities/teacher.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUser } from 'users/interface/user.interface';

@Entity('users')
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({
    update: false,
  })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => StudentEntity, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  student: StudentEntity;

  @OneToOne(() => TeacherEntity, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  teacher: TeacherEntity;

  @OneToOne(() => AdminEntity, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  admin: AdminEntity;
}
