import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { UserEntity, RegisterUserDto } from "users";

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