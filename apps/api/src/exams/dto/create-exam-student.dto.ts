import { ExamEntity } from "exams/entities/exam.entity";
import { IStudentExam } from "exams/interfaces/student-exam.interface";
import { StudentEntity } from "students/entities/student.entity";

export class CreateExamStudentDto implements  Omit<IStudentExam, 'created_at'|'updated_at'>{  
    grade: number;
    isDone: boolean;
    videoPath: string;
}
