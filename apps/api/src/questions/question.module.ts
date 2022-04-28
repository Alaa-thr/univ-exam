import { Module } from '@nestjs/common';
import { QuestionsService,QuestionsController,QuestionsRepository } from 'questions';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionsRepository])
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
