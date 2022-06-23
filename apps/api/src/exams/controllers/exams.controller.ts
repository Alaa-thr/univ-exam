import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { IUser } from '@users';
import { CreateExamDto, ExamsService, UpdateExamDto } from 'exams';
import { User } from 'shared/decorators/user.decorator';
import { JwtAuthGuard } from 'users/guards/jwt-auth.guard';
import { IStudentExam } from '../interfaces/student-exam.interface';
import { IExam } from 'exams/interfaces/exam.interface';
import { StudentExamService } from 'exams/services/student-exam.service';
import { IQuestion } from 'exams/interfaces/question.interface';
import { ApiTags } from '@nestjs/swagger';
import { QueryDto } from 'shared';

@Controller('exams')
@ApiTags('Exams')
@UseGuards(JwtAuthGuard)
export class ExamsController {
  constructor(
    private readonly examsService: ExamsService,
    private readonly studentExamService: StudentExamService
  ) {}

  @Post()
  create(@Body() createExamDto: CreateExamDto) {
    return this.examsService.createOne(createExamDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateExamDto) {
    return this.examsService.updateOne(id, UpdateExamDto);
  }

  @Get()
  async findAllExams(
    //@User() userLogged: IUser,
    @Query() query: QueryDto
  ) {
    //const { teacher } = userLogged;
    return await this.examsService.findAllExams(query,"e5374b05-c23c-40cd-8fc4-883fd0b7dc85");
  }
  

  @Get('scheduled-exams')
  async findAllScheduledExams(
    @User() userLogged: IUser
  ): Promise<IStudentExam[]> {
    const { student } = userLogged;
    return await this.studentExamService.findAllScheduledExams(student.id);
  }

  @Get('taken-exams')
  async findAllTakenExams(@User() userLogged: IUser): Promise<IStudentExam[]> {
    const { student } = userLogged;
    return await this.studentExamService.findAllTakenExams(student.id);
  }

  @Get('scheduled-exam/get-exam-started-time')
  getExamStartedTime(): { startedExam: string } {
    return this.examsService.getTodayTime();
  }

  @Get('scheduled-exam/get-today-date-time')
  getTodayDateWithTime() {
    return this.examsService.getTodayDateWithTime();
  }
  @Get('student-exam-answers/:examId/:studentId')
  async findStudentExamAmswers(
    @Param('examId') examId: string,
    @Param('studentId') studentId: string,
  ): Promise<{ examDetails: IExam; studentAnswewr: IQuestion[] }> {
    return await this.examsService.findTakenExamsById(studentId, examId);
  }
  @Get('publish/:id')
  publishExam(@Param('id') examId: string) {
    return this.examsService.publishExam(examId);
  }
  @Get('exam-student/:id')
  async findAllStudentOfExam(
    @Param('id') examId: string
  ) {
    return await this.studentExamService.findAllStudentOfExam(examId);
  }
  @Get('taken-exams/:id')
  async findTakenExamsById(
    @Param('id') examId: string,
    @User() userLogged: IUser
  ): Promise<{ examDetails: IExam; studentAnswewr: IQuestion[] }> {
    const { student } = userLogged;
    return await this.examsService.findTakenExamsById(student.id, examId);
  }

  @Get('scheduled-exam/:id')
  async findScheduledExamById(
    @Param('id') examId: string,
    @User() userLogged: IUser
  ): Promise<IExam> {
    const { student } = userLogged;
    return await this.examsService.findScheduledExamById(student.id, examId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IExam> {
    return await this.examsService.findOne(id);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string){
    return await this.examsService.deleteOne(id);
  }
}
