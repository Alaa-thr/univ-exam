import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AnswerEntity } from "answers";

@Injectable()
@EntityRepository(AnswerEntity)
export class AnswersRepository extends Repository<AnswerEntity>{}