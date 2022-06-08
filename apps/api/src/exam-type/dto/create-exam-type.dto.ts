import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { ExamTypeEnum } from "exam-type/emun/exam-type.enum";
import { IExamType } from "exam-type/interface/exam-type.interface";

export class CreateExamTypeDto implements Omit<IExamType, 'id'|'created_at'|'updated_at'|'exams'>{

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(ExamTypeEnum,{message: "type must be a valid enum value"})
    type: string;
}
