import { Module } from '@nestjs/common';
import { ExamTypeService } from './exam-type.service';
import { ExamTypeController } from './exam-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamTypeRepository } from './exam-type.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamTypeRepository]),
  ],
  controllers: [ExamTypeController],
  providers: [ExamTypeService],
})
export class ExamTypeModule {}
