import { IsNotEmpty, IsEmail, Length } from "class-validator";
import { IUser } from "users/interface/user.interface";

export class RegisterUserDto implements Omit<IUser, 'id'|'created_at'|'updated_at'|'student'>{
    
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(6,12)
    // @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    //     message: "Password is too weak, choose a stronger password between 6 and 12 characters"
    //   })
    password: string;
    
}