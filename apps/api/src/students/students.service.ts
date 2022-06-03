import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryDto } from 'shared';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { IStudent } from './interface/student.interface';
import { StudentsRepository } from './students.repository';

@Injectable()
export class StudentsService {
  constructor(private readonly studentRepo: StudentsRepository) {}

  async create(data: CreateStudentDto): Promise<IStudent> {
    return await this.studentRepo.saveStudent(data);
  }

  async findAll(query: QueryDto) {
    return await this.studentRepo.findAll(query);
  }

  async findOne(id: string) {
    return await this.studentRepo.findOne(id);
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    return this.studentRepo.updateOne(id, updateStudentDto);
  }

  remove(id: string) {
    return this.studentRepo.delete(id);
  }
}
