import { IInputType } from 'input-type/interface/input-type.interface';
import { IExam } from './exam.interface';


export interface IQuestion {
  id: string;
  text: string;
  point: number;
  created_at: Date;
  updated_at: Date;
  exam: IExam;
  inputType: IInputType;
}
