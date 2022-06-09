import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ILevel } from "level/interfaces/level.interface";

export class CreateLevelDto implements Omit<ILevel, 'id'|'created_at'|'updated_at'|'specialities'>{

    @ApiProperty()
    @IsNotEmpty()
    name: string;
}
