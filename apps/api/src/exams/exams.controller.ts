import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { IUser } from '@users';
import { ExamsService,CreateExamDto,UpdateExamDto } from 'exams';
import { User } from 'shared/decorators/user.decorator';
import { JwtAuthGuard } from 'users/guards/jwt-auth.guard';
import { IQuestion } from './interfaces/question.interface';
import { IStudentExam } from './interfaces/student-exam.interface';
import { IExam } from "exams/interfaces/exam.interface";

@Controller('exams')
@UseGuards(JwtAuthGuard)
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {
  }

  @Get('scheduled-exams')
  async findAllScheduledExams(@User() userLogged: IUser): Promise<IStudentExam[]> {
    const {student} = userLogged;
    return await this.examsService.findAllScheduledExams(student.id);
  }

  @Get('taken-exams')
  async findAllTakenExams(@User() userLogged: IUser): Promise<IStudentExam[]> {
    const {student} = userLogged;
    return await this.examsService.findAllTakenExams(student.id);
  }

  @Get('taken-exams/:id')
  async findTakenExamsById(
    @Param('id') examId: string,
    @User() userLogged: IUser
  ):Promise<{examDetails:IExam,studentAnswewr:IQuestion}> {
    const {student} = userLogged;
    return await this.examsService.findTakenExamsById(student.id,examId);
  }

  @Post()
  create(
    @Body() createExamDto: CreateExamDto
  ) { 
    return this.examsService.create(createExamDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto) {
    return this.examsService.update(+id, updateExamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examsService.remove(+id);
  }
}
