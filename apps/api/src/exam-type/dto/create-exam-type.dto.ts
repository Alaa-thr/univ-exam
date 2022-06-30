import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { IExamType } from "exam-type/interface/exam-type.interface";

export class CreateExamTypeDto implements Omit<IExamType, 'id'|'created_at'|'updated_at'|'exams'>{

    @ApiProperty()
    @IsNotEmpty()
    type: string;
}
