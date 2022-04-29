import { IAnswer } from "answers/interface/answer.interface";
import { QuestionEntity } from "questions";
import { StudentEntity } from "students/entities/student.entity";

export class CreateAnswerDto implements Omit<IAnswer, 'id'|'created_at'|'updated_at'>{
    
    title: string;
    isCorrect: boolean;
    question: QuestionEntity;
    students: StudentEntity[];
    
}
