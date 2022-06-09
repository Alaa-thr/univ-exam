import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleController } from './module.controller';
import { ModuleRepository } from './module.repository';
import { ModuleService } from './module.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ModuleRepository]),
  ],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModuleModule {}