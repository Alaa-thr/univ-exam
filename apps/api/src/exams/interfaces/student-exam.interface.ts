import { ExamEntity } from "exams/entities/exam.entity";
import { StudentEntity } from "students/entities/student.entity";

export interface IStudentExam {
    
    grade: number;
    isDone: boolean;
    videoPath: string;
    created_at: Date;
    updated_at: Date;
}