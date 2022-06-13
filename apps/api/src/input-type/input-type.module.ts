import { Module } from '@nestjs/common';
import { InputTypeService } from './input-type.service';
import { InputTypeController } from './input-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InputTypeRepository } from './input-type.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([InputTypeRepository]),
  ],
  controllers: [InputTypeController],
  providers: [InputTypeService],
  exports:[InputTypeService]
})
export class InputTypeModule {}
