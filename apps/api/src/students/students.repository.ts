import { Injectable, InternalServerErrorException } from "@nestjs/common";
import {  EntityRepository, Repository } from "typeorm";
import { CreateStudentDto } from "./dto/create-student.dto";
import { StudentEntity } from "./entities/student.entity";
import { IStudent } from "./interface/student.interface";

@Injectable()
@EntityRepository(StudentEntity)
export class StudentsRepository extends Repository<StudentEntity>{

    public async saveStudent(data: CreateStudentDto):Promise<IStudent> {      
        try{
            return await this.save(data);
        }catch(error){
            console.log('student repo',error.driverError);
            throw new InternalServerErrorException('Something went wrong, student not created repo');
        }
    }
}