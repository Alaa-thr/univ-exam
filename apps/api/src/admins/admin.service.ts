import { Injectable } from '@nestjs/common';
import { QueryDto } from 'shared';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { IAdmin } from './interface/admin.interface';
import { AdminRepository } from './admin.repository';

@Injectable()
export class AdminService {
  constructor(private readonly teacherRepo: AdminRepository) {}

  async create(data: CreateAdminDto): Promise<IAdmin> {
    return await this.teacherRepo.save(data);
  }

  async findAll(query: QueryDto) {
    return await this.teacherRepo.findAll(query);
  }

  async findOne(id: string) {
    return await this.teacherRepo.findOne(id);
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    return this.teacherRepo.updateOne(id, updateAdminDto);
  }

  remove(id: string) {
    return this.teacherRepo.delete(id);
  }
}
