import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { getPagination, getPagingData, QueryDto } from 'shared';
import { EntityRepository, Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentEntity } from './entities/student.entity';
import { IStudent } from './interface/student.interface';
@Injectable()
@EntityRepository(StudentEntity)
export class StudentsRepository extends Repository<StudentEntity> {
  async updateOne(id: string, updateStudentDto: UpdateStudentDto) {
    await this.update(id, updateStudentDto);
    return this.findOne(id);
  }
  public async saveStudent(data: CreateStudentDto): Promise<IStudent> {
    return await this.save(data);
  }

  async findAll(query: QueryDto) {
    const { keyword, limit, page, order } = query;
    const { take, skip } = getPagination(page, limit);

    let orderField = 'students.firstName';
    let orderType: 'ASC' | 'DESC' = 'ASC';

    if (order) {
      orderField = 'students.' + order.split(' ')[0];
      orderType = order.split(' ')[1] === 'DESC' ? 'DESC' : 'ASC';
    }

    const users = await this.createQueryBuilder('students')
      .where(
        keyword
          ? `(LOWER(students.firstName) LIKE LOWER('%${keyword}%') OR
          LOWER(students.lastName) LIKE LOWER('%${keyword}%') OR
          LOWER(students.phoneNumber) LIKE LOWER('%${keyword}%') ) `
          : '1=1'
      )
      .leftJoinAndSelect("students.level","level")
      .leftJoinAndSelect("students.speciality","speciality")
      .orderBy(orderField, orderType)
      .offset(skip)
      .limit(take)
      .getManyAndCount();

    return getPagingData(users, take, skip);
  }

  async findOneBySpecialityLevel(specialityId: string, levelId:string){
    return await this.createQueryBuilder('student')
    .where("student.speciality = :specialityId",{specialityId:specialityId})
    .andWhere("student.level = :levelId",{levelId:levelId})
    .leftJoinAndSelect("student.level","level")
    .leftJoinAndSelect("student.speciality","speciality")
    .getMany();
  }
}
