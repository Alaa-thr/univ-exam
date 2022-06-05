import { IStudent } from 'students/interface/student.interface';
import { ITeacher } from 'teachers/interface/teacher.interface';

export interface IUser {
  id: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  student?: IStudent;
  teacher?: ITeacher;
}
