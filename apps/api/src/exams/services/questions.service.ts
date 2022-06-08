import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from 'exams/dto/create-question.dto';
import { IAnswer } from 'exams/interfaces/answer.interface';
import { IQuestion } from 'exams/interfaces/question.interface';
import { QuestionsRepository } from 'exams/repositiries/questions.repository';
import { AnswersService } from './answers.service';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly questionsRepo: QuestionsRepository,
    private readonly answersService: AnswersService
  ) {}

  async createOne(createQuestionDto: CreateQuestionDto) {
    const createdAnswers: IAnswer[] = await this.answersService.create(
      createQuestionDto.answers
    );

    return await this.questionsRepo.save({
      ...createQuestionDto,
      answers: createdAnswers,
    });
  }

  async createMany(createQuestionDtoList: CreateQuestionDto[]) {
    const createdQuestionsList: IQuestion[] = [];

    for (let index = 0; index < createQuestionDtoList.length; index++) {
      const createQuestionDto = createQuestionDtoList[index];
      const createdQuestion: IQuestion = await this.createOne(
        createQuestionDto
      );
      createdQuestionsList.push(createdQuestion);
    }
    return createdQuestionsList;
  }
}
