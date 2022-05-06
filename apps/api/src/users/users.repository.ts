import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { UserEntity, IUser } from "users";
import { RegisterStudentUserDto } from "./dto/register-student-user.dto";

@Injectable()
@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {

    public async saveUser(data: RegisterStudentUserDto):Promise<IUser> {     

        try{
            return await this.save(data);
        }catch(error){
            console.log('user repo',error);
            throw new InternalServerErrorException('Something went wrong, user not created repo');
        }
    }

    public async findUser(email: string):Promise<IUser>{
        try{
            const user = await this.findOne({email});
            return user;
        }catch(error){
            console.log('user repo',error);
            throw new InternalServerErrorException('Something went wrong, user not found');
        }
    }
}