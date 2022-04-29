import { PartialType } from "@nestjs/swagger";
import { CreateAnswerDto } from "answers";

export class UpdateAnswerDto extends PartialType(CreateAnswerDto){}
