import { Injectable } from '@nestjs/common';
import { StudentExamRepository} from '../repositiries/student-exam.repository';
import { IStudentExam } from '../interfaces/student-exam.interface';
import { AnswersRepository } from 'exams/repositiries/answers.repository';

@Injectable()
export class AnswersService {

  constructor(
    private readonly answerRepo: AnswersRepository){
  }
  
  async createStudentAnswers(studentId: string,createStudentAnswersDto: any): Promise<any> {
    
    const {questions} = createStudentAnswersDto;
   // const answersId = this.getStudentAnswers(questions);
    

    //return await this.answerRepo.createStudentAnswers(studentId,answersId);
  }

  private getStudentAnswers(questions: any): string[]{
    const answers: string[] = [];
    for(let i = 0; i< questions.length; i++){
      for(let j = 0; j< questions[i].answers.length; j++){
        answers.push(questions[i].answers[j]);
      }
    }
    return answers;
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
