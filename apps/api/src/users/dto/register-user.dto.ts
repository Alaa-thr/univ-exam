
import { IsEmail, IsNotEmpty, Length} from "class-validator";

export class RegisterUserDto {
    
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
