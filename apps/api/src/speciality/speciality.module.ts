import { Module } from '@nestjs/common';
import { SpecialityService } from './speciality.service';
import { SpecialityController } from './speciality.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialityRepository } from './speciality.repository';
import { SpecialityModuleLevelModule } from 'speciality-module-level/speciality-module-level.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SpecialityRepository]),
    SpecialityModuleLevelModule
  ],
  controllers: [SpecialityController],
  providers: [SpecialityService],
})
export class SpecialityModule {}
