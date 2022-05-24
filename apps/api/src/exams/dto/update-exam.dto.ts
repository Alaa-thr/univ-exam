import { PartialType } from "@nestjs/swagger";
import { CreateExamDto } from "exams";

export class UpdateExamDto extends PartialType(CreateExamDto){}
