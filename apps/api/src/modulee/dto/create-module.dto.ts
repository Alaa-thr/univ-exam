import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { IModule } from "modulee/interfaces/module.interface";

export class CreateModuleDto implements Omit<IModule, 'id'|'created_at'|'updated_at'|'levels'|'exams'>{

    @ApiProperty()
    @IsNotEmpty()
    name: string;
}
