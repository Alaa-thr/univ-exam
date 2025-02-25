import { Module } from '@nestjs/common';
import { ExamsService, ExamsController, StudentExamRepository } from 'exams';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamRepository } from './repositiries/exams.repository';
import { AnswersController } from './controllers/answers.controller';
import { AnswersService } from './services/answers.service';
import { AnswersRepository } from './repositiries/answers.repository';
import { StudentExamService } from './services/student-exam.service';
import { QuestionsRepository } from './repositiries/questions.repository';
import { QuestionsService } from './services/questions.service';
import { InputTypeModule } from 'input-type/input-type.module';
import { ExamTypeModule } from 'exam-type/exam-type.module';
import { UsersModule } from '@users';
import { NotificationsModule } from 'notifications';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExamRepository,
      StudentExamRepository,
      AnswersRepository,
      QuestionsRepository,
      
    ]),
    InputTypeModule,
    ExamTypeModule,
    UsersModule,
    NotificationsModule,
  ],
  controllers: [ExamsController, AnswersController],
  providers: [
    ExamsService,
    AnswersService,
    StudentExamService,
    QuestionsService,
  ],
  exports: [StudentExamService,ExamsService]
})
export class ExamsModule {}
