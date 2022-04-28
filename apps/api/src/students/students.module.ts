import { Module } from '@nestjs/common';
import { StudentsService,StudentsController,StudentsRepository } from 'students';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentsRepository])
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
