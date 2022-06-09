import { Injectable } from '@nestjs/common';
import { QueryDto } from 'shared';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { ISpeciality } from './interfaces/speciality.interface';
import { SpecialityRepository } from './speciality.repository';

@Injectable()
export class SpecialityService {

  constructor(private readonly specialityRepo: SpecialityRepository) {}

  async create(data: CreateSpecialityDto): Promise<ISpeciality> {
    return await this.specialityRepo.save(data);
  }

  async findAll(query: QueryDto) {
    return await this.specialityRepo.findAll(query);
  }

  async findOne(id: string) {
    return await this.specialityRepo.findOne(id);
  }

  update(id: string, updateSpecialityDto: UpdateSpecialityDto) {
    return this.specialityRepo.updateOne(id, updateSpecialityDto);
  }

  remove(id: string) {
    return this.specialityRepo.delete(id);
  }
}
