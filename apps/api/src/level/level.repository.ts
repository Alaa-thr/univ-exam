import { Injectable } from "@nestjs/common";
import { getPagination, getPagingData, QueryDto } from "shared";
import { EntityRepository, Repository } from "typeorm";
import { UpdateLevelDto } from "./dto/update-level.dto";
import { LevelEntity } from "./entities/level.entity";
import { ILevel } from "./interfaces/level.interface";

@Injectable()
@EntityRepository(LevelEntity)
export class LevelRepository extends Repository<LevelEntity>{

    async updateOne(id: string, updateExamTypeDto: UpdateLevelDto): Promise<ILevel> {
        await this.update(id, updateExamTypeDto);
        return this.findOne(id);
    }

    async findAll(query: QueryDto) {
        const { keyword, limit, page, order } = query;
        const { take, skip } = getPagination(page, limit);
    
        let orderField = 'speciality.name';
        let orderType: 'ASC' | 'DESC' = 'ASC';
    
        if (order) {
          orderField = 'speciality.' + order.split(' ')[0];
          orderType = order.split(' ')[1] === 'DESC' ? 'DESC' : 'ASC';
        }
    
        const users = await this.createQueryBuilder('speciality')
          .where(keyword ? `(LOWER(speciality.name) LIKE LOWER('%${keyword}%')`: '1=1')
          .orderBy(orderField, orderType)
          .offset(skip)
          .limit(take)
          .getManyAndCount();
    
        return getPagingData(users, take, skip);
      }
    
}