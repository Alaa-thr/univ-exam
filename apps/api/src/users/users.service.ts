import { Injectable } from '@nestjs/common';
import { QueryDto } from 'shared';
import { RegisterUserDto, LoginUserDto, UsersRepository } from 'users';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  create(createUserDto: RegisterUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findAll(query: QueryDto) {
    return this.usersRepository.findAll(query);
  }

  findOne(id: string) {
    return this.usersRepository.findOne(id);
  }

  update(id: string, updateUserDto: LoginUserDto) {
    return this.usersRepository.updateOne(id, updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository.delete(id);
  }
}
