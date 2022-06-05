import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryDto } from 'shared';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ITeacher } from './interface/teacher.interface';
import { TeachersRepository } from './teacher.repository';

@Injectable()
export class TeachersService {
  constructor(private readonly teacherRepo: TeachersRepository) {}

  async create(data: CreateTeacherDto): Promise<ITeacher> {
    return await this.teacherRepo.save(data);
  }

  async findAll(query: QueryDto) {
    return await this.teacherRepo.findAll(query);
  }

  async findOne(id: string) {
    return await this.teacherRepo.findOne(id);
  }

  update(id: string, updateTeacherDto: UpdateTeacherDto) {
    return this.teacherRepo.updateOne(id, updateTeacherDto);
  }

  remove(id: string) {
    return this.teacherRepo.delete(id);
  }
}
