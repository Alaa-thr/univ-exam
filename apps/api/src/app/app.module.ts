import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamsModule } from 'exams';
import { NotificationsModule } from 'notifications';
import { StudentsModule } from 'students/students.module';
import { TeachersModule } from 'teachers/teachers.module';
import { UsersModule } from 'users';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmOptions } from './config/typeorm.config';
import { ExamTypeModule } from 'exam-type/exam-type.module';
import { InputTypeModule } from 'input-type/input-type.module';
import { SpecialityModule } from 'speciality/speciality.module';
import { LevelModule } from 'level/level.module';
import { ModuleModule } from 'modulee/module.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmOptions),
    UsersModule,
    TeachersModule,
    StudentsModule,
    ExamsModule,
    NotificationsModule,
    ExamTypeModule,
    InputTypeModule,
    SpecialityModule,
    LevelModule,
    ModuleModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
