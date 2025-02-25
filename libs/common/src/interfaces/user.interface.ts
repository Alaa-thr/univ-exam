import { IAdmin } from "./admin.interface";
import { IStudent } from "./student.interface";
import { ITeacher } from "./teacher.interface";

export interface IUser {
  id: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  student?: IStudent;
  teacher?: ITeacher;
  admin?: IAdmin;
}
