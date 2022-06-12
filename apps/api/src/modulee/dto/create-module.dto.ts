import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches } from "class-validator";
import { IModule } from "modulee/interfaces/module.interface";

export class CreateModuleDto implements Omit<IModule, 'id'|'created_at'|'updated_at'|'exams'>{

    @ApiProperty()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9 ]+$/,{
        message: "the name need to have only letters and numbers"
    })
    name: string;
}
