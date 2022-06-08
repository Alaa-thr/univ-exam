import { ExamTypeEntity } from "exam-type/entities/exam-type.entity";
import { QuestionEntity } from "exams/entities/question.entity";

export class CreateExamDto {
    
    title: string;
    date: Date;
    startHour: Date;
    endHour: Date;
    isPublished: boolean;
    questions: QuestionEntity[];
    examType: ExamTypeEntity;
    answersArePublished: boolean;
    
}
