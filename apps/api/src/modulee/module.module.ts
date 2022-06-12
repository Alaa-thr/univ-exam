import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialityModuleLevelModule } from 'speciality-module-level/speciality-module-level.module';
import { ModuleController } from './module.controller';
import { ModuleRepository } from './module.repository';
import { ModuleService } from './module.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ModuleRepository]),
    SpecialityModuleLevelModule
  ],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModuleModule {}
