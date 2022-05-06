import { Module } from '@nestjs/common';
import { ExamsService,ExamsController,ExamsRepository } from 'exams';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamsRepository]),
  ],
  controllers: [ExamsController],
  providers: [ExamsService],
})
export class ExamsModule {}
