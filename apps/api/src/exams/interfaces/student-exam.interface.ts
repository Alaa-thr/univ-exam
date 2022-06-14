
import { IStudent } from "students/interface/student.interface";
import { IExam } from "./exam.interface";

export interface IStudentExam {
    
    grade: number;
    isDone: boolean;
    videoPath: string;
    student: IStudent;
    exam: IExam;
    created_at: Date;
    updated_at: Date;
}