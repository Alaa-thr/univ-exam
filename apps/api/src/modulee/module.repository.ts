import { Injectable } from "@nestjs/common";
import { getPagination, getPagingData, QueryDto } from "shared";
import { EntityRepository, Repository } from "typeorm";
import { UpdateModuleDto } from "./dto/update-module.dto";
import { ModuleEntity } from "./entities/module.entity";
import { IModule } from "./interfaces/module.interface";

@Injectable()
@EntityRepository(ModuleEntity)
export class ModuleRepository extends Repository<ModuleEntity>{

    async updateOne(id: string, updateExamTypeDto: UpdateModuleDto): Promise<IModule> {
        await this.update(id, updateExamTypeDto);
        return this.findOne(id);
    }

    async findAll(query: QueryDto) {
        const { keyword, limit, page, order } = query;
        const { take, skip } = getPagination(page, limit);
    
        let orderField = 'module.name';
        let orderType: 'ASC' | 'DESC' = 'ASC';
    
        if (order) {
          orderField = 'module.' + order.split(' ')[0];
          orderType = order.split(' ')[1] === 'DESC' ? 'DESC' : 'ASC';
        }
    
        const users = await this.createQueryBuilder('module')
          .where(keyword ? `(LOWER(module.name) LIKE LOWER('%${keyword}%')`: '1=1')
          .orderBy(orderField, orderType)
          .offset(skip)
          .limit(take)
          .getManyAndCount();
    
        return getPagingData(users, take, skip);
      }
    
}