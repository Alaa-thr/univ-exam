import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { IUser,LoginUserDto,UsersRepository } from 'users';
import { StudentsService } from 'students/students.service';
import { IStudent } from 'students/interface/student.interface';
import { RegisterStudentUserDto } from './dto/register-student-user.dto';

@Injectable()
export class UserAuthService {

  constructor(
    private readonly userRepo: UsersRepository,
    private readonly jwtService : JwtService,
    private readonly studentService: StudentsService
  ){ }

  /*public async registerStudent(data: RegisterStudentUserDto): Promise<IStudent> {

    const {email, password,student} = data;
    const cryptedPassword = await this.cryptPassword(password);
    try{
      const user = await this.userRepo.saveUser({email: email, password: cryptedPassword})
      student.user = user;
      return await this.studentService.create(student);
    }catch(error){
      throw new InternalServerErrorException("Something went wrong, user not created.");
    }  
  }*/

  public async login(data: LoginUserDto){
    const {email} = data;
    const user = await this.checkUserEmail(email);
    const token = await this.checkUserPassword(data, user.password);
    return token;
  }

  private async cryptPassword(password: string): Promise<string>{
    const salt = await bcrypt.genSalt();
    const cryptedPassword = await bcrypt.hash(password, salt); 
    return cryptedPassword;
  }

  private async checkUserEmail(email: string): Promise<IUser>{
    const user = await this.userRepo.findUser(email);
    if(!user){
      throw new UnauthorizedException('Username or Password is invalid');
    }
    return user;
  }

  private async checkUserPassword(data: LoginUserDto, userPassword: string){
    const {email, password} = data;
    const isPasswordMatch = await bcrypt.compare(password, userPassword);
    if(!isPasswordMatch){
      throw new UnauthorizedException('Username or Password is invalid');
      
    }
    return this.generateToken(email);
  }

  private async generateToken(email: string){ 
    const payload = {email};
    const jwtToken = await this.jwtService.signAsync(payload)
    return {
      token: jwtToken
    }    
  }
}
