import { ExamTypeEnum } from "exams";
import { QuestionEntity } from "exams/entities/question.entity";

export class CreateExamDto {
    
    title: string;
    date: Date;
    startHour: Date;
    endHour: Date;
    isPublished: boolean;
    questions: QuestionEntity[];
    examType: ExamTypeEnum;
    answersArePublished: boolean;
    
}
