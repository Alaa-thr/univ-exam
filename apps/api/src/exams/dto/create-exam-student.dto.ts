import { IStudentExam } from "exams/interfaces/student-exam.interface";

export class CreateExamStudentDto implements  Omit<IStudentExam, 'created_at'|'updated_at'|'student'>{  
    grade: number;
    isDone: boolean;
    videoPath: string;
}
