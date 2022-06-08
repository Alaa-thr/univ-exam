import { ExamTypeEnum } from "exam-type/emun/exam-type.enum";
import {  IExam } from "exams";


export interface IExamType {
  id: string;
  type: ExamTypeEnum | string;
  created_at: Date;
  updated_at: Date;
  exams: IExam[];
}
