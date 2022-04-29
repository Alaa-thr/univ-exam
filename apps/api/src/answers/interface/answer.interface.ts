
import { QuestionEntity } from "questions";
import { StudentEntity } from "students/entities/student.entity";

export interface IAnswer {
    
    id: string;
    title: string;
    isCorrect: boolean;
    created_at: Date;
    updated_at: Date;
    question: QuestionEntity;
    students: StudentEntity[];
}
