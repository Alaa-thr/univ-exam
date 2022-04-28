import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { StudentEntity } from "students";

@Injectable()
@EntityRepository(StudentEntity)
export class StudentsRepository extends Repository<StudentEntity>{}