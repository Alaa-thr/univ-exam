import { Injectable } from '@nestjs/common';
import { QueryDto } from 'shared';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { IAdmin } from './interface/admin.interface';
import { AdminRepository } from './admin.repository';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepo: AdminRepository) {}

  async create(data: CreateAdminDto): Promise<IAdmin> {
    return await this.adminRepo.save(data);
  }

  async findAll(query: QueryDto) {
    return await this.adminRepo.findAll(query);
  }

  async findOne(id: string) {
    return await this.adminRepo.findOne(id);
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    return this.adminRepo.updateOne(id, updateAdminDto);
  }

  remove(id: string) {
    return this.adminRepo.delete(id);
  }
}
