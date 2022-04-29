import { UserEntity } from "@users";
import { IStudent } from "students/interface/student.interface";

export class CreateStudentDto implements Omit<IStudent, 'id'|'created_at'|'updated_at'>{

    fistName: string;
    lastName: string;
    phoneNumber: number;
    birthDate: Date;
    studentNumber: number;
    user: UserEntity;
}
