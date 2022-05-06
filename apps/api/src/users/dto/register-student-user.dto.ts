import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { CreateStudentDto } from "students/dto/create-student.dto";
import { IUser } from "users/interface/user.interface";
import {  Type } from 'class-transformer';

export class RegisterStudentUserDto implements Omit<IUser, 'id'|'created_at'|'updated_at'|'studentId'>{
    
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(6,12)
    // @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    //     message: "Password is too weak, choose a stronger password between 6 and 12 characters"
    //   })
    password: string;

    @IsNotEmpty()
    @Type(()=>CreateStudentDto)
    student: CreateStudentDto;
    
}