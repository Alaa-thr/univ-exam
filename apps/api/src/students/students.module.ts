import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsController } from './students.controller';
import { StudentsRepository } from './students.repository';
import { StudentsService } from './students.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentsRepository])
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
