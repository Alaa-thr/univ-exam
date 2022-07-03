import { Injectable } from '@nestjs/common';
import { StudentExamRepository} from '../repositiries/student-exam.repository';
import { IStudentExam } from '../interfaces/student-exam.interface';
import { UpdateExamStudentDto } from '../dto/update-exam-student.dto';
import { Cron } from '@nestjs/schedule';
import { CreateStudentDto } from 'students/dto/create-student.dto';
import { IExam } from 'exams/interfaces/exam.interface';
import { IStudent } from 'students/interface/student.interface';
import { QueryDto } from 'shared';

@Injectable()
export class StudentExamService {

  constructor(private readonly studentExamRepo: StudentExamRepository){
  }
  
  @Cron('0 */1 * * * *')
  handleCron() {
    this.studentExamRepo.changeExamStatus();
    console.log("cron called")
  }

  async createOne(data: UpdateExamStudentDto): Promise<IStudentExam> {
    return await this.studentExamRepo.save(data);
  }

  async setCheatedStudent(updateExamStudentDto:UpdateExamStudentDto): Promise<IStudentExam> {
    updateExamStudentDto.isDone = true;
    updateExamStudentDto.grade = -2;
    return await this.studentExamRepo.save(updateExamStudentDto);
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
  async findAllStudentOfExam(examId: string){
    return await this.studentExamRepo.createQueryBuilder("stdntexam")
    .leftJoin("stdntexam.student","student")
    .leftJoin("student.level","level")
    .leftJoin("student.speciality","speciality")
    .where("stdntexam.exam = :id", {id: examId})
    .select([
      "stdntexam.videoPath",
      "student.firstName",
      "student.id",
      "student.lastName",
      "student.studentNumber",
      "level.name",
      "speciality.name",
    ])
    .getMany();
  }
  async findAllScheduledExams(studentId: string,query: QueryDto): Promise<IStudentExam[]> {
    return await this.studentExamRepo.findAllScheduledExams(studentId,query);
  }

  async findAllTakenExams(studentId: string,query: QueryDto): Promise<IStudentExam[]> {
    return await this.studentExamRepo.findAllTakenExams(studentId,query);
  }

  async createStudentVideo(studentId: string,examId: string,updateExamStudentDto: UpdateExamStudentDto): Promise<IStudentExam> {
    return await this.studentExamRepo.createStudentVideo(studentId,examId,updateExamStudentDto);
  }
}
