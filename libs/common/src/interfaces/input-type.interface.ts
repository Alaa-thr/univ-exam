import { InputTypeEnum } from "../enum/input-type.enum";
import { IQuestion } from "./question.interface";

export interface IInputType {
  id: string;
  type: InputTypeEnum | string;
  created_at: Date;
  updated_at: Date;
  questions: IQuestion[];
}
