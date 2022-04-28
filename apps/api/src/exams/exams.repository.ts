import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { ExamEntity } from "exams";

@Injectable()
@EntityRepository(ExamEntity)
export class ExamsRepository extends Repository<ExamEntity>{}