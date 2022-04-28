import { InputTypeEnum } from "questions/enum/input-type.enum";

export interface IQuestion {
    
    id: string;
    text: string;
    inputType: InputTypeEnum;
    created_at: Date;
    updated_at: Date;
}
