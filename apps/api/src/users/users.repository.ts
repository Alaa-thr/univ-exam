import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { getPagination, getPagingData, LoginUserDto, QueryDto } from 'shared';
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity, IUser } from 'users';
import { RegisterAdminUserDto } from './dto/register-admin-user.dto';
import { RegisterStudentUserDto } from './dto/register-student-user.dto';
import { RegisterTeacherUserDto } from './dto/register-teacher-user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  public async saveUser(
    data: RegisterStudentUserDto | RegisterTeacherUserDto | RegisterAdminUserDto
  ): Promise<IUser> {
    try {
      return await this.save(data);
    } catch (error) {
      console.log('user repo', error);
      throw new InternalServerErrorException(
        'Something went wrong, user not created repo'
      );
    }
  }

  public async findUser(emailOrId: string): Promise<IUser> {
    try {
      let query = this.createQueryBuilder('users')
        .leftJoinAndSelect('users.teacher', 'teacher')
        .leftJoinAndSelect('users.student', 'student')
        .leftJoinAndSelect('users.admin', 'admin')
        .leftJoinAndSelect('student.level', 'level')
        .leftJoinAndSelect('student.speciality', 'speciality')
        .where('users.email = :email', { email: emailOrId });

      if (isUUID(emailOrId, 4)) {
        query = query
          .orWhere('users.id = :id', { id: emailOrId })
          .orWhere('teacher.id = :id', { id: emailOrId })
          .orWhere('student.id = :id', { id: emailOrId })
          .orWhere('admin.id = :id', { id: emailOrId });
      }

      return query.getOne();
    } catch (error) {
      console.log('user repo', error);
      throw new InternalServerErrorException(
        'Something went wrong, user not found'
      );
    }
  }

  async findAll(query: QueryDto) {
    const { keyword, limit, page, order } = query;
    const { take, skip } = getPagination(page, limit);
    let orderField = 'users.email';
    let orderType: 'ASC' | 'DESC' = 'ASC';

    if (order) {
      orderField = 'users.' + order.split(' ')[0];
      orderType = order.split(' ')[1] === 'DESC' ? 'DESC' : 'ASC';
    }

    const users = await this.createQueryBuilder('users')
      .where(keyword ? `LOWER(users.email) LIKE LOWER('%${keyword}%')` : '1=1')
      .orderBy(orderField, orderType)
      .offset(skip)
      .limit(take)
      .getManyAndCount();

    return getPagingData(users, take, skip);
  }

  async updateOne(id: string, updateUserDto: UpdateUserDto) {
    const query = await this.createQueryBuilder('users')
      .leftJoinAndSelect('users.teacher', 'teacher')
      .leftJoinAndSelect('users.student', 'student')
      .leftJoinAndSelect('users.admin', 'admin')
      .where('users.id = :id', { id: id })
      .orWhere('teacher.id = :id', { id: id })
      .orWhere('student.id = :id', { id: id })
      .orWhere('admin.id = :id', { id: id });

    await query.update(updateUserDto).execute();
    return await query.getOne();
  }
  async findOneByStudent(studentId: string) {
    return await this.createQueryBuilder('user')
      .where('user.student = :id', { id: studentId })
      .getOne();
  }
  async findOneByTeacher(teacherID: string) {
    return await this.createQueryBuilder('user')
      .where('user.teacher = :id', { id: teacherID })
      .getOne();
  }
}
