import { Module } from '@nestjs/common';
import { SpecialityModuleLevelService } from './speciality-module-level.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialityModuleLevelRepository } from './speciality-module-level.repository';
import { LevelModule } from 'level/level.module';
import { SpecialityModuleLevelController } from './speciality-module-level.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SpecialityModuleLevelRepository]),
    LevelModule
  ],
  controllers: [SpecialityModuleLevelController],
  providers: [SpecialityModuleLevelService],
  exports: [SpecialityModuleLevelService]
})
export class SpecialityModuleLevelModule {}
