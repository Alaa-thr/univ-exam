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
import { IStudentExam } from './interfaces/student-exam.interface';


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
  findTakenExamsById(
    @Param('id') examId: string,
    @User() userLogged: IUser
  ) {
    const {student} = userLogged;
    return this.examsService.findTakenExamsById(student.id,examId);
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
