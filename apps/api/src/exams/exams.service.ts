import { Injectable } from '@nestjs/common';
import { CreateExamDto ,UpdateExamDto } from 'exams';
import { StudentExamRepository} from './repositiries/student-exam.repository';
import { IStudentExam } from './interfaces/student-exam.interface';
import { ExamRepository } from './repositiries/exams.repository';
import { IExam } from "exams/interfaces/exam.interface";
import { IQuestion } from './interfaces/question.interface';
import { UpdateExamStudentDto } from './dto/update-exam-student.dto';

@Injectable()
export class ExamsService {

  constructor(
    private readonly studentExamRepo: StudentExamRepository,
    private readonly examRepo: ExamRepository){
  }
  
  async findAllScheduledExams(studentId: string): Promise<IStudentExam[]> {
    return await this.studentExamRepo.findAllScheduledExams(studentId);
  }

  async findAllTakenExams(studentId: string): Promise<IStudentExam[]> {
    return await this.studentExamRepo.findAllTakenExams(studentId);
  }

  async findTakenExamsById(studentId: string, examId: string): Promise<{examDetails:IExam,studentAnswewr:IQuestion}> {
    const examDetails = await this.examRepo.findTakenExamsById(studentId,examId);
    const studentAnswer = await this.examRepo.findStudentAnswersById(studentId,examId);
    return {
      examDetails: examDetails,
      studentAnswewr: studentAnswer[0].questions
    };
  }

  async findScheduledExamById(studentId: string, examId: string): Promise<IExam> {
    return await this.examRepo.findScheduledExamById(studentId,examId);
  }

  create(createExamDto: CreateExamDto) {
    return 'This action adds a new student';
  }

  async findOne(id: string): Promise<IExam> {
    return await this.examRepo.findExamById(id);
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
