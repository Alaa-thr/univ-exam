import { IExamType } from "./exam-type.interface";
import { IModule } from "./module.interface";
import { IQuestion } from "./question.interface";
import { IStudentExam } from "./student-exam.interface";
import { ITeacher } from "./teacher.interface";

export interface IExam {
  id: string;
  title: string;
  date: Date;
  startHour: Date;
  endHour: Date;
  isPublished: boolean;
  examType: IExamType;
  answersArePublished: boolean;
  questions: IQuestion[];
  studentExams: IStudentExam[];
  teacher: ITeacher;
  created_at: Date;
  updated_at: Date;
  module: IModule;
}