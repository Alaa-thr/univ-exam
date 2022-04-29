import { Injectable } from '@nestjs/common';
import { CreateAnswerDto ,UpdateAnswerDto } from 'answers';

@Injectable()
export class AnswersService {
  create(createAnswerDto: CreateAnswerDto) {
    return 'This action adds a new student';
  }

  findAll() {
    return `This action returns all exams`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
