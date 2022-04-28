import { PartialType } from "@nestjs/swagger";
import { CreateExamDto } from "exams";

export class UpdateExamDto extends PartialType(CreateExamDto){

    id: string;
    created_at: Date;
    updated_at: Date;
}
