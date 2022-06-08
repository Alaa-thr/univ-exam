import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '@users';
import * as dotenv from 'dotenv';
import { ExamTypeEntity } from 'exam-type/entities/exam-type.entity';
import { ExamEntity } from 'exams';
import { AnswerEntity } from 'exams/entities/answer.entity';
import { QuestionEntity } from 'exams/entities/question.entity';
import { StudentExamEntity } from 'exams/entities/studentExam.entity';
import { InputTypeEntity } from 'input-type/entities/input-type.entity';
import { NotificationEntity } from 'notifications';
import { StudentEntity } from 'students/entities/student.entity';
import { TeacherEntity } from 'teachers/entities/teacher.entity';

dotenv.config();

export const typeOrmOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    TeacherEntity,
    StudentEntity,
    UserEntity,
    NotificationEntity,
    ExamEntity,
    StudentExamEntity,
    QuestionEntity,
    AnswerEntity,
    ExamTypeEntity,
    InputTypeEntity
  ],
  synchronize: true,
};
