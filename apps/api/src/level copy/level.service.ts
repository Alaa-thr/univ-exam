import { Injectable } from '@nestjs/common';
import { QueryDto } from 'shared';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { ILevel } from './interfaces/level.interface';
import { LevelRepository } from './level.repository';

@Injectable()
export class LevelService {

  constructor(private readonly specialityRepo: LevelRepository) {}

  async create(data: CreateLevelDto): Promise<ILevel> {
    return await this.specialityRepo.save(data);
  }

  async findAll(query: QueryDto) {
    return await this.specialityRepo.findAll(query);
  }

  async findOne(id: string) {
    return await this.specialityRepo.findOne(id);
  }

  update(id: string, updateLevelDto: UpdateLevelDto) {
    return this.specialityRepo.updateOne(id, updateLevelDto);
  }

  remove(id: string) {
    return this.specialityRepo.delete(id);
  }
}
