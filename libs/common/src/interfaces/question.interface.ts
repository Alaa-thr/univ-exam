import { IAnswer } from './answer.interface';
import { IExam } from './exam.interface';
import { IInputType } from './input-type.interface';


export interface IQuestion {
  id: string;
  text: string;
  point: number;
  created_at: Date;
  updated_at: Date;
  exam: IExam;
  inputType: IInputType;
  answers: IAnswer[];
}
