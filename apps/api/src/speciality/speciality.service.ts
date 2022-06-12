import { Injectable } from '@nestjs/common';
import { QueryDto } from 'shared';
import { CreateSpecialityModuleLevelDto } from 'speciality-module-level/dto/create-speciality-module-level.dto';
import { SpecialityModuleLevelService } from 'speciality-module-level/speciality-module-level.service';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { ISpeciality } from './interfaces/speciality.interface';
import { SpecialityRepository } from './speciality.repository';

@Injectable()
export class SpecialityService {

  constructor(
    private readonly specialityRepo: SpecialityRepository,
    private readonly specialityModuleLevelService: SpecialityModuleLevelService) {}

  async create(data: CreateSpecialityDto): Promise<ISpeciality> {

    const {levels, name} = data;
    const speciality = await this.specialityRepo.save({name: name});
    for(let i = 0; i < levels.length; i++){
      const createSpecialityModuleLevelDto: CreateSpecialityModuleLevelDto = {
        speciality: speciality,
        level: levels[i],
        module: null
      }
      await this.specialityModuleLevelService.create(createSpecialityModuleLevelDto);
    }
    return await this.findOne(speciality.id);

  }

  async findAll(query: QueryDto) {
    return await this.specialityRepo.findAll(query);
  }

  async findOne(id: string) {
    return await this.specialityRepo.findOneById(id);
  }

  async update(id: string, updateSpecialityDto: UpdateSpecialityDto) {
    await this.remove(id);
    const {name, levels} = updateSpecialityDto;
    return await this.create({name, levels});
  }

  remove(id: string) {
    return this.specialityRepo.delete(id);
  }
}
