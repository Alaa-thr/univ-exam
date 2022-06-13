import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateExamComponent } from '../teacher/modules/create-exam/create-exam.component';
import { AppRoutingModule, ROUTING } from '../routing/app-routing.module';
import { SideBarComponent } from '../shared/components/side-bar/side-bar.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateExamService } from '../teacher/modules/create-exam/create-exam.service';
import { HttpClientModule } from '@angular/common/http';
import { CapitalizeLetterPipe, SeparateWordsPipe } from '@univ-exam/common';
import { SpecialityComponent } from '../admin/modules/speciality/speciality.component';
import { SpecialityService } from '../admin/modules/speciality/speciality.service';
import { ModuleComponent } from '../admin/modules/modulee/module.component';
import { ModuleService } from '../admin/modules/modulee/module.service';
import { LevelComponent } from '../admin/modules/level/level.component';
import { LevelService } from '../admin/modules/level/level.service';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';
import { CreateStudentComponent } from '../admin/modules/student/create-student/create-student.component';
import { StudentComponent } from '../admin/modules/student/all-students/student.component';
import { StudentService } from '../admin/modules/student/all-students/student.service';
import { CreateStudentService } from '../admin/modules/student/create-student/create-student.service';

@NgModule({
  declarations: [
    AppComponent,
    CreateExamComponent,
    SideBarComponent,
    HeaderComponent,
    SeparateWordsPipe,
    CapitalizeLetterPipe,
    SpecialityComponent,
    LevelComponent,
    ModuleComponent,
    PaginationComponent,
    StudentComponent,
    CreateStudentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ROUTING,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    CreateExamService,
    SpecialityService,
    ModuleService,
    LevelService,
    StudentService,
    CreateStudentService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
