import { Module } from '@nestjs/common';
import { SpecialityModuleLevelService } from './speciality-module-level.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialityModuleLevelRepository } from './speciality-module-level.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([SpecialityModuleLevelRepository]),
  ],
  controllers: [],
  providers: [SpecialityModuleLevelService],
})
export class SpecialityModuleLevelModule {}
