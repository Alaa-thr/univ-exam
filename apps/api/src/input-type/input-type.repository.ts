import { Injectable } from "@nestjs/common";
import { getPagination, getPagingData, QueryDto } from "shared";
import { EntityRepository, Repository } from "typeorm";
import { UpdateInputTypeDto } from "./dto/update-input-type.dto";
import { InputTypeEntity } from "./entities/input-type.entity";
import { IInputType } from "./interface/input-type.interface";

@Injectable()
@EntityRepository(InputTypeEntity)
export class InputTypeRepository extends Repository<InputTypeEntity>{

    async updateOne(id: string, updateExamTypeDto: UpdateInputTypeDto): Promise<IInputType> {
        await this.update(id, updateExamTypeDto);
        return this.findOne(id);
    }

    async findAll(query: QueryDto) {
        const { keyword, limit, page, order } = query;
        const { take, skip } = getPagination(page, limit);
    
        let orderField = 'input_type.type';
        let orderType: 'ASC' | 'DESC' = 'ASC';
    
        if (order) {
          orderField = 'input_type.' + order.split(' ')[0];
          orderType = order.split(' ')[1] === 'DESC' ? 'DESC' : 'ASC';
        }
    
        const users = await this.createQueryBuilder('input_type')
          .where(keyword ? `(LOWER(input_type.type) LIKE LOWER('%${keyword}%')`: '1=1')
          .orderBy(orderField, orderType)
          .offset(skip)
          .limit(take)
          .getManyAndCount();
    
        return getPagingData(users, take, skip);
      }
      
      async findOneByType(type: string): Promise<IInputType>{
        return await this.createQueryBuilder('input_type')
        .where('input_type.type = :type', {type: type})
        .getOne();
      }
}