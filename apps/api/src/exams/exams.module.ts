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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExamRepository,
      StudentExamRepository,
      AnswersRepository,
      QuestionsRepository,
    ]),
  ],
  controllers: [ExamsController, AnswersController],
  providers: [
    ExamsService,
    AnswersService,
    StudentExamService,
    QuestionsService,
  ],
})
export class ExamsModule {}
