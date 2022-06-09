import { Injectable } from '@nestjs/common';
import { QueryDto } from 'shared';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { IModule } from './interfaces/module.interface';
import { ModuleRepository } from './module.repository';

@Injectable()
export class ModuleService {

  constructor(private readonly specialityRepo: ModuleRepository) {}

  async create(data: CreateModuleDto): Promise<IModule> {
    return await this.specialityRepo.save(data);
  }

  async findAll(query: QueryDto) {
    return await this.specialityRepo.findAll(query);
  }

  async findOne(id: string) {
    return await this.specialityRepo.findOne(id);
  }

  update(id: string, updateModuleDto: UpdateModuleDto) {
    return this.specialityRepo.updateOne(id, updateModuleDto);
  }

  remove(id: string) {
    return this.specialityRepo.delete(id);
  }
}
