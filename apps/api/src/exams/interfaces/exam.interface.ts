import { ExamTypeEnum } from "exams/enum/exam-type.enum";

export interface IExam {
    
    id: string;
    title: string;
    date: Date;
    startHour: Date;
    endHour: Date;
    isPublished: boolean;
    examType: ExamTypeEnum;
    answersArePublished: boolean;
    created_at: Date;
    updated_at: Date;
}
