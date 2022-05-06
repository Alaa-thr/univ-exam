import { Injectable } from '@nestjs/common';
import { CreateExamDto ,UpdateExamDto, IExam } from 'exams';
import { IStudent } from 'students/interface/student.interface';
import {ExamsRepository} from './exams.repository';
import { IStudentExam } from './interfaces/student-exam.interface';

@Injectable()
export class ExamsService {

  constructor(private readonly examRepo: ExamsRepository){}
  create(createExamDto: CreateExamDto) {
    return 'This action adds a new student';
  }

  async findAllScheduledExams(studentId: string): Promise<IStudentExam[]> {
    return await this.examRepo.findAllScheduledExams(studentId);
  }

  async findAllTakenExams(studentId: string): Promise<IStudentExam[]> {
    return await this.examRepo.findAllTakenExams(studentId);
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateExamDto: UpdateExamDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
