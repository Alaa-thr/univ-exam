import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { IStudent } from './interface/student.interface';
import { StudentsRepository } from './students.repository';

@Injectable()
export class StudentsService {

  constructor(private readonly studentRepo: StudentsRepository){}

  /*async create(data: CreateStudentDto): Promise<IStudent> {
    try{
      return await this.studentRepo.saveStudent(data)
    }catch(error){
      throw new InternalServerErrorException("Something went wrong, user not created.");
    } 
  }*/

  findAll() {
    return `This action returns all students`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
