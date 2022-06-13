import { Injectable } from '@nestjs/common';
import { QueryDto } from 'shared';
import { CreateInputTypeDto } from './dto/create-input-type.dto';
import { UpdateInputTypeDto } from './dto/update-input-type.dto';
import { InputTypeRepository } from './input-type.repository';
import { IInputType } from './interface/input-type.interface';

@Injectable()
export class InputTypeService {
  constructor(private readonly inputTypeRepo: InputTypeRepository) {}

  async create(data: CreateInputTypeDto): Promise<IInputType> {
    return await this.inputTypeRepo.save(data);
  }

  async findAll(query: QueryDto) {
    return await this.inputTypeRepo.findAll(query);
  }

  async findOne(id: string) {
    return await this.inputTypeRepo.findOne(id);
  }

  async findOneByType(type: string) {
    return await this.inputTypeRepo.findOneByType(type);
  }

  update(id: string, updateTeacherDto: UpdateInputTypeDto) {
    return this.inputTypeRepo.updateOne(id, updateTeacherDto);
  }

  remove(id: string) {
    return this.inputTypeRepo.delete(id);
  }
}
