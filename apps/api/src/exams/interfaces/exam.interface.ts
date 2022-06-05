
import { QuestionEntity } from "exams/entities/question.entity";
import { StudentExamEntity } from "exams/entities/studentExam.entity";
import { ExamTypeEnum } from "exams/enum/exam-type.enum";
import { ITeacher } from 'teachers/interface/teacher.interface';
export interface IExam {
  id: string;
  title: string;
  date: Date;
  startHour: Date;
  endHour: Date;
  isPublished: boolean;
  examType: ExamTypeEnum;
  answersArePublished: boolean;
  teacher: ITeacher;
  created_at: Date;
  updated_at: Date;
}
