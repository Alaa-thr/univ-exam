
import { QuestionEntity } from "exams/entities/question.entity";
import { StudentExamEntity } from "exams/entities/studentExam.entity";
import { ITeacher } from 'teachers/interface/teacher.interface';
import { ExamTypeEntity } from "exam-type/entities/exam-type.entity";
export interface IExam {
  id: string;
  title: string;
  date: Date;
  startHour: Date;
  endHour: Date;
  isPublished: boolean;
  examType: ExamTypeEntity;
  answersArePublished: boolean;
  questions : QuestionEntity[];
  studentExams: StudentExamEntity[];
  teacher: ITeacher;
  created_at: Date;
  updated_at: Date;
}
