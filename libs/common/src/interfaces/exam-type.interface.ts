import { ExamTypeEnum } from "../enum/exam-type.enum";
import { IExam } from "./exam.interface";


export interface IExamType {
  id: string;
  type: ExamTypeEnum | string;
  created_at: Date;
  updated_at: Date;
  exams: IExam[];
}
