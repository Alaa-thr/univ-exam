import { Module } from '@nestjs/common';
import { AnswersService,AnswersController,AnswersRepository } from 'answers';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnswersRepository])
  ],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
