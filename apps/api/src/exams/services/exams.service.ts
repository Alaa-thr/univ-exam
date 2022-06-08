import { Injectable } from '@nestjs/common';
import { ExamRepository } from '../repositiries/exams.repository';
import { IExam } from 'exams/interfaces/exam.interface';
import { IQuestion } from '../interfaces/question.interface';
import { CreateExamDto } from 'exams/dto/create-exam.dto';
import { QuestionsRepository } from 'exams/repositiries/questions.repository';
import { QuestionsService } from './questions.service';
import { UpdateExamDto } from 'exams/dto/update-exam.dto';
import { getStudentAnswers } from 'shared/fonctions/common-functions';

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

  async findTakenExamsById(studentId: string, examId: string): Promise<any> {
    const examDetails = await this.examRepo.findTakenExamsById(
      studentId,
      examId
    );
    const studentAnswer = await this.examRepo.findStudentAnswersById(
      studentId,
      examId
    );
    const getAnswers = getStudentAnswers(studentAnswer.questions);
    const takenExam = this.getQuestionAndItsAnswersAndStudentAnswers(
      examDetails,
      getAnswers
    );
    return takenExam;
  }
  private getQuestionAndItsAnswersAndStudentAnswers(
    examDetails: IExam,
    studentAnswers: any
  ) {
    const details = {
      examType: null,
      title: '',
      date: null,
      startHour: null,
      endHour: null,
      grade: 0,
      questions: [],
    };
    details.examType = examDetails.examType;
    details.date = examDetails.date;
    details.endHour = examDetails.endHour;
    details.startHour = examDetails.startHour;
    details.title = examDetails.title;
    details.grade = examDetails.studentExams[0].grade;
    for (let i = 0; i < examDetails.questions.length; i++) {
      const qst = {
        id: '',
        text: '',
        inputType: '',
        point: 0,
        answers: [
          {
            id: '',
            title: '',
            isCorrect: false,
            isSelected: false,
          },
        ],
      };
      qst.id = examDetails.questions[i].id;
      qst.text = examDetails.questions[i].text;
      qst.inputType = examDetails.questions[i].inputType;
      qst.point = examDetails.questions[i].point;
      for (let j = 0; j < examDetails.questions[i].answers.length; j++) {
        const answr = {
          id: '',
          title: '',
          isCorrect: false,
          isSelected: false,
        };
        answr.id = examDetails.questions[i].answers[j].id;
        answr.title = examDetails.questions[i].answers[j].title;
        answr.isCorrect = examDetails.questions[i].answers[j].isCorrect;
        let qstAnswrIsSelected = 0;
        for (let k = 0; k < studentAnswers.length && !qstAnswrIsSelected; k++) {
          if (studentAnswers[k].id == examDetails.questions[i].answers[j].id) {
            answr.isSelected = true;
            qstAnswrIsSelected++;
          }
        }
        if (!qstAnswrIsSelected) {
          answr.isSelected = false;
        }
        qst.answers.push(answr);
      }
      qst.answers.splice(0, 1);
      details.questions.push(qst);
    }
    //details.questions.splice(0, 1);
    return details;
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
