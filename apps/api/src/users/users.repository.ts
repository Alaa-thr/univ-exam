import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { RegisterUserDto } from "./dto/register-user.dto";
import { UserEntity } from "./entities/user.entity";

@Injectable()
@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {

    public async saveUser(data: RegisterUserDto):Promise<UserEntity> {      
        try{
            return await this.save(data);
        }catch(error){
            throw new InternalServerErrorException('Something went wrong, user not created');
        }
    }

    public async findUser(email: string):Promise<UserEntity>{
        try{
            return await this.findOne({email});
        }catch(error){
            throw new InternalServerErrorException('Something went wrong, user not found');
        }
    }
}