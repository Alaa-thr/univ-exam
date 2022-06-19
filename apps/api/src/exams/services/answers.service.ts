import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from 'exams/dto/create-answer.dto';
import { UpdateExamStudentDto } from 'exams/dto/update-exam-student.dto';
import { IAnswer } from 'exams/interfaces/answer.interface';
import { IQuestion } from 'exams/interfaces/question.interface';
import { AnswersRepository } from 'exams/repositiries/answers.repository';
import { getStudentAnswers } from 'shared/fonctions/common-functions';
import { StudentExamService } from './student-exam.service';

@Injectable()
export class AnswersService {
  constructor(
    private readonly studentExamService: StudentExamService,
    private readonly answerRepo: AnswersRepository
  ) {}

  async createStudentAnswers(
    studentId: string,
    studentAnswers: any,
    video: string
  ): Promise<any> {
    const examId = video.split('_');
    const examQuestions = await this.findAnswersByExamId(examId[0]);
    const studentAnswersId = getStudentAnswers(studentAnswers);
    const grade = this.getExamGrade(examQuestions, studentAnswersId);
    const updateExamStudentDto = new UpdateExamStudentDto();
    updateExamStudentDto.grade = grade;
    updateExamStudentDto.videoPath = video;
    await this.answerRepo.createStudentAnswers(studentId, studentAnswersId);
    return await this.studentExamService.createStudentVideo(
      studentId,
      examId[0],
      updateExamStudentDto
    );
  }
  getSubstructPoint(questionWithItAnswers: IQuestion){
    let correctAnswerNumber = 0;
    for(let i=0; i<questionWithItAnswers.answers.length; i++){
      if(questionWithItAnswers.answers[i].isCorrect) correctAnswerNumber++;
    }
    return questionWithItAnswers.point/correctAnswerNumber;
  }
  private calculeQuestionGrade(data: any): number {
    let gradeOfOneQuestion = 0;
    const {examAnswers, studentAnswers,substractPoint} = data
    for (let i = 0; i < examAnswers.length; i++) {
      for (let j = 0; j < studentAnswers.length; j++) {
        if (examAnswers[i].id == studentAnswers[j] && examAnswers[i].isCorrect) {
          gradeOfOneQuestion += substractPoint;
        }
      }
    }
    return gradeOfOneQuestion;
  }
  private getExamGrade(examQuestions: IQuestion[], answersId: any):number {
    let grade = 0;
    for (let i = 0; i < examQuestions.length; i++) {
      const data = {
        examAnswers: examQuestions[i].answers,
        studentAnswers: answersId,
        substractPoint: this.getSubstructPoint(examQuestions[i])
      };
      grade += this.calculeQuestionGrade(data);
    }
    return grade;
  }
  async findAnswersByExamId(examId: string): Promise<IQuestion[]> {
    return await this.answerRepo.findAnswersByExamId(examId);
  }

  private getStudentAnswers(questions: any): string[] {
    const answers: string[] = [];
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        answers.push(questions[i].answers[j]);
      }
    }
    return answers;
  }

  getExamStartedTime(): { startedExam: string } {
    const today = new Date();
    const startedExam =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    return {
      startedExam: startedExam,
    };
  }

  create(createAnswerDto: CreateAnswerDto[]) {
    return this.answerRepo.save(createAnswerDto);
  }
}
