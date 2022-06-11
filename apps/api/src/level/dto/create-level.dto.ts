import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches } from "class-validator";
import { ILevel } from "level/interfaces/level.interface";

export class CreateLevelDto implements Omit<ILevel, 'id'|'created_at'|'updated_at'|'students'>{

    @ApiProperty()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9 ]+$/,{
        message: "the name need to have only letters and numbers"
    })
    name: string;
}
