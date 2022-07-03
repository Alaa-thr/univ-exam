import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from 'exams/dto/create-question.dto';
import { IAnswer } from 'exams/interfaces/answer.interface';
import { IQuestion } from 'exams/interfaces/question.interface';
import { QuestionsRepository } from 'exams/repositiries/questions.repository';
import { InputTypeService } from 'input-type/input-type.service';
import { AnswersService } from './answers.service';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly questionsRepo: QuestionsRepository,
    private readonly answersService: AnswersService,
    private readonly inputTypeService: InputTypeService
  ) {}

  async createOne(createQuestionDto: CreateQuestionDto): Promise<IQuestion> {
    const { answers, text, point, inputType } = createQuestionDto;
    const createdAnswers: IAnswer[] = await this.answersService.create(answers);
    const getInputType = await this.inputTypeService.findOneByType(inputType);
    return await this.questionsRepo.save({
      text: text,
      point: point,
      inputType: getInputType,
      answers: createdAnswers,
    });
  }

  async createMany(createQuestionDtoList: any[]) {
    const createdQuestionsList: IQuestion[] = [];
    console.log('index :', createQuestionDtoList.length);

    for (let index = 0; index < createQuestionDtoList.length; index++) {
      console.log('index :', index);
      const createQuestionDto = createQuestionDtoList[index];
      const createdQuestion: IQuestion = await this.createOne(
        createQuestionDto
      );
      createdQuestionsList.push(createdQuestion);
    }
    return createdQuestionsList;
  }
}
