import { PartialType } from "@nestjs/swagger";
import { CreateQuestionDto } from "questions";

export class UpdateQuestionDto extends PartialType(CreateQuestionDto){

    id: string;
    created_at: Date;
    updated_at: Date;
}
