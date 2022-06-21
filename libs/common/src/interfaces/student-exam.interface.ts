import { IExam } from "./exam.interface";
import { IStudent } from "./student.interface";

export interface IStudentExam {
    
    grade: number;
    isDone: boolean;
    videoPath: string;
    created_at: Date;
    updated_at: Date;
    student: IStudent;
    exam: IExam;
}