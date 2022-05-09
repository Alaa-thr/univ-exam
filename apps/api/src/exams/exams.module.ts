import { Module } from '@nestjs/common';
import { ExamsService,ExamsController,StudentExamRepository } from 'exams';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamRepository } from './repositiries/exams.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamRepository,StudentExamRepository]),
  ],
  controllers: [ExamsController],
  providers: [ExamsService],
})
export class ExamsModule {}
