import { Injectable } from "@nestjs/common";
import { QueryDto, getPagination, getPagingData } from "shared";
import { EntityRepository, Repository } from "typeorm";
import { UpdateExamTypeDto } from "./dto/update-exam-type.dto";
import { ExamTypeEntity } from "./entities/exam-type.entity";
import { IExamType } from "./interface/exam-type.interface";


@Injectable()
@EntityRepository(ExamTypeEntity)
export class ExamTypeRepository extends Repository<ExamTypeEntity>{

    async updateOne(id: string, updateExamTypeDto: UpdateExamTypeDto): Promise<IExamType> {
        await this.update(id, updateExamTypeDto);
        return this.findOne(id);
    }
    async findOneByType(type: string): Promise<IExamType>{
        return await this.createQueryBuilder('exam_type')
        .where('exam_type.type = :type', {type: type})
        .getOne();
    }
    async findAll(query: QueryDto) {
        const {limit, page, order } = query;
        const { take, skip } = getPagination(page, limit);
    
        let orderField = 'exam_type.type';
        let orderType: 'ASC' | 'DESC' = 'ASC';
    
        if (order) {
          orderField = 'exam_type.' + order.split(' ')[0];
          orderType = order.split(' ')[1] === 'DESC' ? 'DESC' : 'ASC';
        }
    
        const users = await this.createQueryBuilder('exam_type')
          .orderBy(orderField, orderType)
          .offset(skip)
          .limit(take)
          .getManyAndCount();
    
        return getPagingData(users, take, skip);
      }
}