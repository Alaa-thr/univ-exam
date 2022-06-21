import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { getPagination, getPagingData, LoginUserDto, QueryDto } from 'shared';
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity, IUser } from 'users';
import { RegisterStudentUserDto } from './dto/register-student-user.dto';
import { RegisterTeacherUserDto } from './dto/register-teacher-user.dto';

@Injectable()
@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  public async saveUser(
    data: RegisterStudentUserDto | RegisterTeacherUserDto
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

  public async findUser(email: string): Promise<IUser> {
    try {
      const user = await this.findOne({ email });
      return user;
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

  async updateOne(id: string, loginUserDto: LoginUserDto) {
    await this.update(id, loginUserDto);
    return this.findOne(id);
  }
  async findOneByStudent(studentId: string){
    return await this.createQueryBuilder('user')
    .where('user.student = :id',{id: studentId})
    .getOne();
  }
}
