import { Injectable } from '@nestjs/common';
import { CreateQuestionDto ,UpdateQuestionDto } from 'questions';

@Injectable()
export class QuestionsService {
  create(createQuestionDto: CreateQuestionDto) {
    return 'This action adds a new student';
  }

  findAll() {
    return `This action returns all exams`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
