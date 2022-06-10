import { Injectable } from '@nestjs/common';
import { QueryDto } from 'shared';
import { CreateSpecialityModuleLevelDto } from './dto/create-speciality-module-level.dto';
import { UpdateSpecialityModuleLevelDto } from './dto/update-speciality-module-level.dto';
import { ISpecialityModuleLevel } from './interfaces/speciality-module-level.interface';
import { SpecialityModuleLevelRepository } from './speciality-module-level.repository';

@Injectable()
export class SpecialityModuleLevelService {

  constructor(private readonly specialityRepo: SpecialityModuleLevelRepository) {}

  async create(data: CreateSpecialityModuleLevelDto): Promise<ISpecialityModuleLevel> {
    return await this.specialityRepo.save(data);
  }

  async findAll(query: QueryDto) {
    return await this.specialityRepo.findAll(query);
  }

  async findOne(id: string) {
    return await this.specialityRepo.findOne(id);
  }

  update(id: string, updateSpecialityModuleLevelDto: UpdateSpecialityModuleLevelDto) {
    return this.specialityRepo.updateOne(id, updateSpecialityModuleLevelDto);
  }

  remove(id: string) {
    return this.specialityRepo.delete(id);
  }
}
