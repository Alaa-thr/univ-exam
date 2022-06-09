import { IQuestion } from "./question.interface";
import { IStudent } from "./student.interface";

export interface IAnswer {
    
    id: string;
    title: string;
    isCorrect: boolean;
    created_at: Date;
    updated_at: Date;
    question: IQuestion;
    students: IStudent[];
}
