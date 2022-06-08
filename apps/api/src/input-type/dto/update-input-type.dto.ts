import { PartialType } from '@nestjs/swagger';
import { CreateInputTypeDto } from './create-input-type.dto';

export class UpdateInputTypeDto extends PartialType(CreateInputTypeDto) {}
