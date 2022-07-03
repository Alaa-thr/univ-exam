import { Injectable } from '@nestjs/common';
import { QueryDto } from 'shared';
import { RegisterUserDto, LoginUserDto, UsersRepository } from 'users';
import { UpdateUserDto } from './dto/update.user.dto';

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
    return this.usersRepository.findUser(id);
  }

  findOneByStudent(studentId: string) {
    return this.usersRepository.findOneByStudent(studentId);
  }
  findOneByTeacher(teacherId: string) {
    return this.usersRepository.findOneByTeacher(teacherId);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.updateOne(id, updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository.delete(id);
  }
}
