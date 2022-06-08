import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { ExamEntity } from 'exams/entities/exam.entity';
import { IExam } from 'exams/interfaces/exam.interface';
import { resourceLimits } from 'worker_threads';
import { QuestionEntity } from 'exams/entities/question.entity';

@Injectable()
@EntityRepository(QuestionEntity)
export class QuestionsRepository extends Repository<QuestionEntity> {}
