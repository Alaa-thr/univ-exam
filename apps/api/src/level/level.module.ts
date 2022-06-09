import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelController } from './level.controller';
import { LevelRepository } from './level.repository';
import { LevelService } from './level.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LevelRepository]),
  ],
  controllers: [LevelController],
  providers: [LevelService],
})
export class LevelModule {}
