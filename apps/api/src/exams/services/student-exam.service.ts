import { Injectable } from '@nestjs/common';
import { StudentExamRepository} from '../repositiries/student-exam.repository';
import { IStudentExam } from '../interfaces/student-exam.interface';
import { UpdateExamStudentDto } from '../dto/update-exam-student.dto';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class StudentExamService {

  constructor(private readonly studentExamRepo: StudentExamRepository){
  }
  
  @Cron('0 0 * * * *')
  handleCron() {
    this.studentExamRepo.changeExamStatus();
    console.log("cron called")
  }

  async findAllScheduledExams(studentId: string): Promise<IStudentExam[]> {
    return await this.studentExamRepo.findAllScheduledExams(studentId);
  }

  async findAllTakenExams(studentId: string): Promise<IStudentExam[]> {
    return await this.studentExamRepo.findAllTakenExams(studentId);
  }

  async createStudentVideo(studentId: string,examId: string,updateExamStudentDto: UpdateExamStudentDto): Promise<IStudentExam> {
    return await this.studentExamRepo.createStudentVideo(studentId,examId,updateExamStudentDto);
  }
  getExamStartedTime(): {startedExam: string} {
    const today = new Date();
    const startedExam = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return {
      startedExam: startedExam
    }; 
  }
}
