import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEnum } from "class-validator";
import { InputTypeEnum } from "input-type/enum/input-type.enum";
import { IInputType } from "input-type/interface/input-type.interface";

export class CreateInputTypeDto implements Omit<IInputType, 'id'|'created_at'|'updated_at'|'questions'>{

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(InputTypeEnum)
    type: string;
}
