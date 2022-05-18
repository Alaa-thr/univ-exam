import { ExamTypeEnum } from "exams";

export class CreateExamDto {
    
    title: string;
    date: Date;
    startHour: Date;
    endHour: Date;
    isPublished: boolean;
    examType: ExamTypeEnum;
    answersArePublished: boolean;
    
}
