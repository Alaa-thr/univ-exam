import { Injectable } from "@nestjs/common";
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
}