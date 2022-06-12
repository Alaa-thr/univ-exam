import { Module } from '@nestjs/common';
import { SpecialityModuleLevelService } from './speciality-module-level.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialityModuleLevelRepository } from './speciality-module-level.repository';
import { LevelModule } from 'level/level.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SpecialityModuleLevelRepository]),
    LevelModule
  ],
  controllers: [],
  providers: [SpecialityModuleLevelService],
  exports: [SpecialityModuleLevelService]
})
export class SpecialityModuleLevelModule {}
