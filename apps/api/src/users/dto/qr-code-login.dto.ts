import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class QrCodeLoginDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID(4,{ message: "The QR Code is invalid" })
    code: string;
  }