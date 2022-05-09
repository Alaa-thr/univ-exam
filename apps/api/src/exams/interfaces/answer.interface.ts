import { IStudent } from "students/interface/student.interface";
import { IQuestion } from "./question.interface";

export interface IAnswer {
    
    id: string;
    title: string;
    isCorrect: boolean;
    point: number;
    created_at: Date;
    updated_at: Date;
    question: IQuestion;
    students: IStudent[];
}
