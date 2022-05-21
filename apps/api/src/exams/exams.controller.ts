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

  @Get('scheduled-exam/:id')
  async findScheduledExamById(
    @Param('id') examId: string,
    @User() userLogged: IUser
  ):Promise<IExam> {
    const {student} = userLogged;
    return await this.examsService.findScheduledExamById(student.id,examId);
  }

  @Post('take-exam')
  async addStudentAnswers(
    @Body() createStudentAnswersDto: UpdateExamDto,
    @User() userLogged: IUser
  ):Promise<IExam> {
    const {student} = userLogged;
    console.log("createStudentAnswersDto",createStudentAnswersDto);
    return null;
    
    //return await this.examsService.findScheduledExamById(student.id,examId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IExam> {
    return await this.examsService.findOne(id);
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
