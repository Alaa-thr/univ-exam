import { InputTypeEnum } from "exams/enum/input-type.enum";
import { IExam } from "./exam.interface";

export interface IQuestion {
    
    id: string;
    text: string;
    inputType: InputTypeEnum;
    created_at: Date;
    updated_at: Date;
    exam: IExam;
 
    
}