import { Injectable } from '@nestjs/common';
import { ExamRepository } from '../repositiries/exams.repository';
import { IExam } from 'exams/interfaces/exam.interface';
import { IQuestion } from '../interfaces/question.interface';
import { CreateExamDto } from 'exams/dto/create-exam.dto';
import { QuestionsService } from './questions.service';
import { UpdateExamDto } from 'exams/dto/update-exam.dto';
import { getStudentAnswers } from 'shared/fonctions/common-functions';
import { ExamTypeService } from 'exam-type/exam-type.service';
import { StudentExamService } from './student-exam.service';
import { QueryDto } from 'shared';
import { IStudent } from 'students/interface/student.interface';
import { NotificationsService } from 'notifications';
import { UsersService } from '@users';

@Injectable()
export class ExamsService {
  constructor(
    private readonly examRepo: ExamRepository,
    private readonly questionsService: QuestionsService,
    private readonly examTypeService: ExamTypeService,
    private readonly studentExamService: StudentExamService,
    private readonly notificationService: NotificationsService,
    private readonly userService: UsersService,
  ) {}

  async publishExam(id: string){
    const studentWillTakeExam = await this.studentExamService.findAllStudentOfExam(id);
    await this.examRepo.update(id, {isPublished: true});
    const exam = await this.examRepo.findOne(id);
    for(let i=0; i< studentWillTakeExam.length ; i++){
      await this.sendInvitationToStuduent(studentWillTakeExam[i].student, exam.title);
    }
    
  }
  async sendInvitationToStuduent(student: IStudent, title:string){
    const notif = {
      description: "The exam "+title+" is published now",
      user: await this.userService.findOneByStudent(student.id)
    }
    return await this.notificationService.create(notif);  
  }
  async deleteOne(id: string){
    return await this.examRepo.delete(id);
  }
  async findAllExams(query: QueryDto,teacherId: string){
    return await this.examRepo.findAll(query,teacherId);
  }

  async createOne(createExamDto: CreateExamDto) {
    const {questions, title, date,startHour,endHour,isPublished,examType, specialityModuleLevel, students} = createExamDto;
    const createdQuestions: IQuestion[] = await this.questionsService.createMany(questions);
    const getInputType = await this.examTypeService.findOneByType(examType);
    const exam =  await this.examRepo.save({
      title: title,
      date: date,
      startHour: startHour,
      endHour: endHour,
      isPublished: isPublished,
      examType: getInputType,
      specialityModuleLevel: specialityModuleLevel,
      questions: createdQuestions,
    });
    await this.studentExamService.createMany(students,exam);
    if(isPublished){
      await this.publishExam(exam.id);
    }
    return exam;
  }

  async updateOne(id: string, updateExamDto: UpdateExamDto) {
    const exam = await this.examRepo.findById(id);

    // const createdQuestions: IQuestion[] =
    //   await this.questionsService.createMany({
    //     ...exam.questions,
    //     ...updateExamDto.questions,
    //   });

    // return this.examRepo.save({ ...updateExamDto, ...createdQuestions, id });
  }

  async findTakenExamsById(studentId: string, examId: string): Promise<any> {
    const examDetails = await this.examRepo.findTakenExamsById(
      studentId,
      examId
    );
    const studentAnswer = await this.examRepo.findStudentAnswersById(
      studentId,
      examId
    );
    let getAnswers = [];
    if(studentAnswer){
      getAnswers = getStudentAnswers(studentAnswer.questions);
    }
    const takenExam = this.getQuestionAndItsAnswersAndStudentAnswers(
      examDetails,
      getAnswers
    );
    return takenExam;
  }
  private getQuestionAndItsAnswersAndStudentAnswers(
    examDetails: IExam,
    studentAnswers: any
  ) {
    const details = {
      examType: null,
      title: '',
      date: null,
      startHour: null,
      endHour: null,
      grade: 0,
      questions: [],
      videoPath: '',
      student: {}
    };
    details.examType = examDetails.examType.type;
    details.date = examDetails.date;
    details.endHour = examDetails.endHour;
    details.startHour = examDetails.startHour;
    details.title = examDetails.title;
    details.grade = examDetails.studentExams[0].grade;
    details.videoPath = examDetails.studentExams[0].videoPath;
    details.student = examDetails.studentExams[0].student;
    
    if(studentAnswers.length > 0){
      for (let i = 0; i < examDetails.questions.length; i++) {
        const qst = {
          id: '',
          text: '',
          inputType: '',
          point: 0,
          answers: [
            {
              id: '',
              title: '',
              isCorrect: false,
              isSelected: false,
            },
          ],
        };
        qst.id = examDetails.questions[i].id;
        qst.text = examDetails.questions[i].text;
        qst.inputType = examDetails.questions[i].inputType.type;
        qst.point = examDetails.questions[i].point;
        for (let j = 0; j < examDetails.questions[i].answers.length; j++) {
          const answr = {
            id: '',
            title: '',
            isCorrect: false,
            isSelected: false,
          };
          answr.id = examDetails.questions[i].answers[j].id;
          answr.title = examDetails.questions[i].answers[j].title;
          answr.isCorrect = examDetails.questions[i].answers[j].isCorrect;
          let qstAnswrIsSelected = 0;
          for (let k = 0; k < studentAnswers.length && !qstAnswrIsSelected; k++) {
            if (studentAnswers[k].id == examDetails.questions[i].answers[j].id) {
              answr.isSelected = true;
              qstAnswrIsSelected++;
            }
          }
          if (!qstAnswrIsSelected) {
            answr.isSelected = false;
          }
          qst.answers.push(answr);
        }
        qst.answers.splice(0, 1);
        details.questions.push(qst);
      }
    }
    return details;
  }
  async findScheduledExamById(
    studentId: string,
    examId: string
  ): Promise<IExam> {
    return await this.examRepo.findScheduledExamById(studentId, examId);
  }

  async findOne(id: string): Promise<IExam> {
    return await this.examRepo.findById(id);
  }

  getTodayTime(): { startedExam: string } {
    const today = new Date();
    const startedExam =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    return {
      startedExam: startedExam,
    };
  }
  getTodayDateWithTime() {
    const today = new Date();
    const time = this.getTodayTime();
    const startedExam = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return {
      time: time.startedExam,
      date: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    }; 
  }
}
