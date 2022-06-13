import { Injectable } from "@nestjs/common";
import { getPagination, getPagingData, QueryDto } from "shared";
import { EntityRepository, Repository } from "typeorm";
import { UpdateSpecialityModuleLevelDto } from "./dto/update-speciality-module-level.dto";
import { SpecialityModuleLevelEntity } from "./entities/speciality-module-level.entity";
import { ISpecialityModuleLevel } from "./interfaces/speciality-module-level.interface";

@Injectable()
@EntityRepository(SpecialityModuleLevelEntity)
export class SpecialityModuleLevelRepository extends Repository<SpecialityModuleLevelEntity>{

    async updateOne(id: string, updateExamTypeDto: UpdateSpecialityModuleLevelDto): Promise<ISpecialityModuleLevel> {
        await this.update(id, updateExamTypeDto);
        return this.findOne(id);
    }

    async findBySpeciality(specialityId: string) {
        return await this.createQueryBuilder('specialityModuleLevel')
          .leftJoin("specialityModuleLevel.speciality","speciality")
          .leftJoinAndSelect("specialityModuleLevel.level","level")
          .leftJoinAndSelect("specialityModuleLevel.module","module")
          .where("specialityModuleLevel.speciality = :id", {id: specialityId})
          .getMany();
      }

      async findOneBySpecialityLevel(specialityId: string, levelId: string){
        return await this.createQueryBuilder('specialityModuleLevel')
        .where("specialityModuleLevel.speciality = :id", {id: specialityId})
        .andWhere("specialityModuleLevel.level = :level", {level: levelId})
        .getOne();
      }
    
}