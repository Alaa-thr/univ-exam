import { Injectable } from '@nestjs/common';
import { LevelEntity } from 'level/entities/level.entity';
import { QueryDto } from 'shared';
import { SpecialityModuleLevelEntity } from 'speciality-module-level/entities/speciality-module-level.entity';
import { SpecialityModuleLevelService } from 'speciality-module-level/speciality-module-level.service';
import { SpecialityEntity } from 'speciality/entities/speciality.entity';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { IModule } from './interfaces/module.interface';
import { ModuleRepository } from './module.repository';

@Injectable()
export class ModuleService {

  constructor(
    private readonly moduleRepo: ModuleRepository,
    private readonly specialityModuleLevelService: SpecialityModuleLevelService
  ) {}

  async create(data: CreateModuleDto): Promise<IModule> {
    const {name, speciality, level} = data;
    const nameLowerCase = name.toLowerCase();
    let existModule = await this.findOneByName(nameLowerCase);
    const specialityModuleLevel = await this.specialityModuleLevelService.findOneBySpecialityLevel(speciality.id, level.id);
    let createModule;
    if(!existModule){
      createModule = await this.moduleRepo.save({name: nameLowerCase});
      existModule = createModule;
    }
    if(specialityModuleLevel){
      specialityModuleLevel.module = existModule;
      await this.specialityModuleLevelService.create(specialityModuleLevel);  
    }else{
      const specialityModuleLevel = new SpecialityModuleLevelEntity();
      specialityModuleLevel.level = level as LevelEntity;
      specialityModuleLevel.module = existModule;
      specialityModuleLevel.speciality = speciality as SpecialityEntity;
      await this.specialityModuleLevelService.create(specialityModuleLevel);
    }
    return await this.findOne(existModule.id);
  }

  async findAll(query: QueryDto) {
    return await this.moduleRepo.findAll(query);
  }

  async findOne(id: string) {
    return await this.moduleRepo.findOneById(id);
  }
  async findOneByName(name :string){
    return await this.moduleRepo.findOneByName(name);
  }
  update(id: string, updateModuleDto: UpdateModuleDto) {
    return this.moduleRepo.updateOne(id, updateModuleDto);
  }

  remove(id: string) {
    return this.moduleRepo.delete(id);
  }
}
