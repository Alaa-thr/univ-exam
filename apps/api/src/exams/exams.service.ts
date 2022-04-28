import { Injectable } from '@nestjs/common';
import { CreateExamDto ,UpdateExamDto } from 'exams';

@Injectable()
export class ExamsService {
  create(createExamDto: CreateExamDto) {
    return 'This action adds a new student';
  }

  findAll() {
    return `This action returns all exams`;
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
