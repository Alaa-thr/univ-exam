import { Injectable } from '@nestjs/common';
import { getPagination, getPagingData, QueryDto } from 'shared';
import { EntityRepository, Repository } from 'typeorm';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TeacherEntity } from './entities/teacher.entity';
@Injectable()
@EntityRepository(TeacherEntity)
export class TeachersRepository extends Repository<TeacherEntity> {
  async updateOne(id: string, updateTeacherDto: UpdateTeacherDto) {
    await this.update(id, updateTeacherDto);
    return this.findOne(id);
  }

  async findAll(query: QueryDto) {
    const { keyword, limit, page, order } = query;
    const { take, skip } = getPagination(page, limit);

    let orderField = 'teachers.firstName';
    let orderType: 'ASC' | 'DESC' = 'ASC';

    if (order) {
      orderField = 'teachers.' + order.split(' ')[0];
      orderType = order.split(' ')[1] === 'DESC' ? 'DESC' : 'ASC';
    }

    const users = await this.createQueryBuilder('teachers')
      .where(
        keyword
          ? `(LOWER(teachers.firstName) LIKE LOWER('%${keyword}%') OR
          LOWER(teachers.lastName) LIKE LOWER('%${keyword}%') OR
          LOWER(teachers.phoneNumber) LIKE LOWER('%${keyword}%') ) `
          : '1=1'
      )
      .orderBy(orderField, orderType)
      .offset(skip)
      .limit(take)
      .getManyAndCount();

    return getPagingData(users, take, skip);
  }
}
