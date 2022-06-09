import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ISpeciality } from "speciality/interfaces/speciality.interface";

export class CreateSpecialityDto implements Omit<ISpeciality, 'id'|'created_at'|'updated_at' | 'students'>{

    @ApiProperty()
    @IsNotEmpty()
    name: string;
}
