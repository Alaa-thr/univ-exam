
import{ TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UserEntity } from "@users";
import { AnswerEntity } from "answers";
import * as dotenv from 'dotenv';
import { ExamEntity } from "exams";
import { NotificationEntity } from "notifications";
import { QuestionEntity } from "questions";
import { StudentEntity } from "students/entities/student.entity";

dotenv.config();

export const typeOrmOptions: TypeOrmModuleOptions ={
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME ,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [StudentEntity, UserEntity, NotificationEntity, ExamEntity, QuestionEntity, AnswerEntity],
    synchronize: true, 
}