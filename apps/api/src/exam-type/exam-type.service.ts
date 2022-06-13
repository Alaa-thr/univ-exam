import { Injectable } from '@nestjs/common';
import { CreateExamTypeDto } from './dto/create-exam-type.dto';
import { UpdateExamTypeDto } from './dto/update-exam-type.dto';
import { ExamTypeRepository } from './exam-type.repository';
import { IExamType } from './interface/exam-type.interface';

@Injectable()
export class ExamTypeService {

  constructor(private readonly examTypeRepo: ExamTypeRepository) {}
  
  async create(createExamTypeDto: CreateExamTypeDto): Promise<IExamType> {
    return await this.examTypeRepo.save(createExamTypeDto);
  }

  async findAll(): Promise<IExamType[]> {
    return await this.examTypeRepo.find();
  }

  async findOne(id: string): Promise<IExamType> {
    return await this.examTypeRepo.findOne(id);
  }

  async findOneByType(type: string) {
    return await this.examTypeRepo.findOneByType(type);
  }

  async update(id: string, updateExamTypeDto: UpdateExamTypeDto): Promise<IExamType> {
    return await this.examTypeRepo.updateOne(id, updateExamTypeDto);
  }

  async remove(id: string) {
    return await this.examTypeRepo.delete(id);
  }
}
