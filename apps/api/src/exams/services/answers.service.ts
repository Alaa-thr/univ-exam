import { Injectable } from '@nestjs/common';
import { UsersService } from '@users';
import { CreateAnswerDto } from 'exams/dto/create-answer.dto';
import { UpdateExamStudentDto } from 'exams/dto/update-exam-student.dto';
import { IAnswer } from 'exams/interfaces/answer.interface';
import { IQuestion } from 'exams/interfaces/question.interface';
import { AnswersRepository } from 'exams/repositiries/answers.repository';
import { NotificationEntity, NotificationsService } from 'notifications';
import { getStudentAnswers } from 'shared/fonctions/common-functions';
import { ITeacher } from 'teachers/interface/teacher.interface';
import { StudentExamService } from './student-exam.service';

@Injectable()
export class AnswersService {
  constructor(
    private readonly studentExamService: StudentExamService,
    private readonly userService: UsersService,
     private readonly notifService: NotificationsService,
    private readonly answerRepo: AnswersRepository
  ) {}

  async reCalculateGrade(teacher: ITeacher, data: any){
    const studentAnswers =  data.questions;
    for(let i = 0; i<studentAnswers.length; i++ ){
      for(let j= 0; j< studentAnswers[i].answers.length; j++){
        if(!studentAnswers[i].answers[j].isSelected){
          studentAnswers[i].answers.splice(j,1)
        }
      }
    }
    const examQuestions = await this.findAnswersByExamId(data.examId);
    const studentAnswersId = getStudentAnswers(studentAnswers);
    const grade = this.getExamGrade(examQuestions, studentAnswersId);
    return await this.studentExamService.updateByStudentExamId(data.studentId,data.examId,{grade: grade});
  }
  async updateByStudentExamId(data: any, grade: number,teacher: ITeacher){
    const notif = new NotificationEntity();
    notif.description = "the teacher "+teacher.firstName+" "+teacher.lastName+" has changed your grade because you cheated by "+data.reason;
    const user = await this.userService.findOneByTeacher(teacher.id);
    notif.user = user;
    await this.notifService.create(notif);
    return await this.studentExamService.updateByStudentExamId(data.studentId,data.examId,{grade: grade});
  }
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
        if (examAnswers[i].id == studentAnswers[j].id && examAnswers[i].isCorrect) {
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
