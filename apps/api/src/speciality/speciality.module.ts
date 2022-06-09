import { Module } from '@nestjs/common';
import { SpecialityService } from './speciality.service';
import { SpecialityController } from './speciality.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialityRepository } from './speciality.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([SpecialityRepository]),
  ],
  controllers: [SpecialityController],
  providers: [SpecialityService],
})
export class SpecialityModule {}
