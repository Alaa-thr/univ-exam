import { Injectable } from '@nestjs/common';
import { ExamRepository } from '../repositiries/exams.repository';
import { IExam } from 'exams/interfaces/exam.interface';
import { IQuestion } from '../interfaces/question.interface';
import { CreateExamDto } from 'exams/dto/create-exam.dto';
import { QuestionsRepository } from 'exams/repositiries/questions.repository';
import { QuestionsService } from './questions.service';
import { UpdateExamDto } from 'exams/dto/update-exam.dto';

@Injectable()
export class ExamsService {
  constructor(
    private readonly examRepo: ExamRepository,
    private readonly questionsService: QuestionsService
  ) {}

  async createOne(createExamDto: CreateExamDto) {
    const createdQuestions: IQuestion[] =
      await this.questionsService.createMany(createExamDto.questions);

    return this.examRepo.save({
      ...createExamDto,
      questions: createdQuestions,
    });
  }

  async updateOne(id: string, updateExamDto: UpdateExamDto) {
    const exam = await this.examRepo.findById(id);

    const createdQuestions: IQuestion[] =
      await this.questionsService.createMany({
        ...exam.questions,
        ...updateExamDto.questions,
      });

    return this.examRepo.save({ ...updateExamDto, ...createdQuestions, id });
  }

  async findTakenExamsById(
    studentId: string,
    examId: string
  ): Promise<{ examDetails: IExam; studentAnswewr: IQuestion }> {
    const examDetails = await this.examRepo.findTakenExamsById(
      studentId,
      examId
    );
    const studentAnswer = await this.examRepo.findStudentAnswersById(
      studentId,
      examId
    );
    return {
      examDetails: examDetails,
      studentAnswewr: studentAnswer[0].questions,
    };
  }

  async findScheduledExamById(
    studentId: string,
    examId: string
  ): Promise<IExam> {
    return await this.examRepo.findScheduledExamById(studentId, examId);
  }

  async findOne(id: string): Promise<IExam> {
    return await this.examRepo.findById(id);
  }

  getExamStartedTime(): { startedExam: string } {
    const today = new Date();
    const startedExam =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    return {
      startedExam: startedExam,
    };
  }
}
