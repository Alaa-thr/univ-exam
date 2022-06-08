
import { IQuestion } from "exams/interfaces/question.interface";
import { InputTypeEnum } from "input-type/enum/input-type.enum";


export interface IInputType {
  id: string;
  type: InputTypeEnum | string;
  created_at: Date;
  updated_at: Date;
  questions: IQuestion[];
}
