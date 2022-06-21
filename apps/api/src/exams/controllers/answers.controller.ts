import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { IUser } from '@users';
import { User } from 'shared/decorators/user.decorator';
import { JwtAuthGuard } from 'users/guards/jwt-auth.guard';
import { AnswersService } from 'exams/services/answers.service';
import {Express} from 'express';
import { diskStorage, Multer } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('answers')
@UseGuards(JwtAuthGuard)
export class AnswersController {
  constructor(private readonly answerService: AnswersService) {
  }

  @Post('student-answers')
  @UseInterceptors(FileInterceptor('video', 
    {
      storage: diskStorage({
        destination: "uploads",
        filename:(req,file,callbackFunct)=>{
          const videoName = file.originalname;
          callbackFunct(null, videoName);
        }
      })
    }
  ))
  async createStudentAnswers(
    @UploadedFile() video: Express.Multer.File,
    @Body() createStudentAnswersDto: any,
    @User() userLogged: IUser
  ):Promise<any> {
    const {student} = userLogged;
    const questions = JSON.parse(createStudentAnswersDto.questions);
    const videoName = video.originalname;
    return await this.answerService.createStudentAnswers(student.id,questions,videoName);
  }

}
