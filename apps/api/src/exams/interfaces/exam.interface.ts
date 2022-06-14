import { ITeacher } from 'teachers/interface/teacher.interface';
import { IQuestion } from './question.interface';
import { IStudentExam } from './student-exam.interface';
import { IExamType } from 'exam-type/interface/exam-type.interface';
import { ISpecialityModuleLevel } from 'speciality-module-level/interfaces/speciality-module-level.interface';
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
  specialityModuleLevel: ISpecialityModuleLevel;
}
