import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { QuestionEntity } from "questions";

@Injectable()
@EntityRepository(QuestionEntity)
export class QuestionsRepository extends Repository<QuestionEntity>{}