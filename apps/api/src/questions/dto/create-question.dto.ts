import { InputTypeEnum } from "questions/enum/input-type.enum";

export class CreateQuestionDto {
    
    text: string;
    inputType: InputTypeEnum;
}
