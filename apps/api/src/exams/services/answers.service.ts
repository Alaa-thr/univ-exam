import { Injectable } from '@nestjs/common';
import { UpdateExamStudentDto } from 'exams/dto/update-exam-student.dto';
import { IAnswer } from 'exams/interfaces/answer.interface';
import { AnswersRepository } from 'exams/repositiries/answers.repository';
import { getStudentAnswers } from 'shared/fonctions/common-functions';
import { StudentExamService } from './student-exam.service';

@Injectable()
export class AnswersService {

  constructor(
    private readonly studentExamService: StudentExamService,
    private readonly answerRepo: AnswersRepository){
  }
  
  async createStudentAnswers(studentId: string,studentAnswers: any,video: string): Promise<any> {
    
    const examId = video.split('_');
    const examAnswers = await this.findAnswersByExamId(examId[0])
    const answersId = getStudentAnswers(studentAnswers);
    const grade = this.calculeAnswersPoint(examAnswers,answersId);
    const updateExamStudentDto = new UpdateExamStudentDto();
    updateExamStudentDto.grade = grade;
    updateExamStudentDto.videoPath = video;
    await this.answerRepo.createStudentAnswers(studentId,answersId);
    return await this.studentExamService.createStudentVideo(studentId,examId[0],updateExamStudentDto);
  }

  private calculeAnswersPoint(examAnswers: IAnswer[], answersId: any):number{
    let grade = 0;
    for(let i = 0; i < examAnswers.length; i++){
      for(let j = 0; j < answersId.length; j++){
        if((examAnswers[i].id == answersId[j]) && (examAnswers[i].isCorrect) ){
          grade+= examAnswers[i].question.point;
        }
      }
    }
    return grade;
  }
  async findAnswersByExamId(examId:string):Promise<IAnswer[]>{
    return await this.answerRepo.findAnswersByExamId(examId);
  }
  getExamStartedTime(): {startedExam: string} {
    const today = new Date();
    const startedExam = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return {
      startedExam: startedExam
    }; 
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
