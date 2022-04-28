import { ExamTypeEnum } from "exams";

export class CreateExamDto {
    
    title: string;
    date: Date;
    startHour: Date;
    endHoud: Date;
    isPublished: boolean;
    examType: ExamTypeEnum;
    answersArePublished: boolean;
    
}
