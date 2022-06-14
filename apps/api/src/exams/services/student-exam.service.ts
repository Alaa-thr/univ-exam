import { Injectable } from '@nestjs/common';
import { StudentExamRepository} from '../repositiries/student-exam.repository';
import { IStudentExam } from '../interfaces/student-exam.interface';
import { UpdateExamStudentDto } from '../dto/update-exam-student.dto';
import { Cron } from '@nestjs/schedule';
import { CreateExamStudentDto } from 'exams/dto/create-exam-student.dto';
import { CreateStudentDto } from 'students/dto/create-student.dto';
import { CreateExamDto } from 'exams/dto/create-exam.dto';
import { IExam } from 'exams/interfaces/exam.interface';
import { IStudent } from 'students/interface/student.interface';

@Injectable()
export class StudentExamService {

  constructor(private readonly studentExamRepo: StudentExamRepository){
  }
  
  @Cron('0 0 * * * *')
  handleCron() {
    this.studentExamRepo.changeExamStatus();
    console.log("cron called")
  }

  async createOne(data: UpdateExamStudentDto): Promise<IStudentExam> {
    return await this.studentExamRepo.save(data);
  }

  async createMany(students: CreateStudentDto[], exam: IExam) {
    for (let index = 0; index < students.length; index++) {
      const student = students[index];
      await this.createOne(
         {
           student: (student as IStudent),
           exam: exam
         }
      );
    }
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
  // getExamStartedTime(): {startedExam: string} {
  //   const today = new Date();
  //   const startedExam = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  //   return {
  //     startedExam: startedExam
  //   }; 
  // }
}
