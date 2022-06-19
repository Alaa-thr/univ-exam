import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateExamComponent } from '../teacher/modules/exam/create-exam/create-exam.component';
import { AppRoutingModule, ROUTING } from '../routing/app-routing.module';
import { SideBarComponent } from '../shared/components/side-bar/side-bar.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateExamService } from '../teacher/modules/exam/create-exam/create-exam.service';
import { HttpClientModule } from '@angular/common/http';
import { CapitalizeLetterPipe, QuestionMarkPipe, SeparateWordsPipe } from '@univ-exam/common';
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
import { StudentExamListComponent } from '../teacher/modules/student-exam-list/student-exam-list.component';
import { StudentExamListService } from '../teacher/modules/student-exam-list/student-exam-list.service';
import { ExamListComponent } from '../teacher/modules/exam/exam-list/exam-list.component';
import { ExamListService } from '../teacher/modules/exam/exam-list/student-exam-list.service';
import { StudentsAnswersDetailsComponent } from '../teacher/modules/students-answers-details/students-answers-details.component';
import { StudentsAnswersDetailsService } from '../teacher/modules/students-answers-details/students-answers-details.service';

@NgModule({
  declarations: [
    AppComponent,
    CreateExamComponent,
    SideBarComponent,
    HeaderComponent,
    SeparateWordsPipe,
    CapitalizeLetterPipe,
    QuestionMarkPipe,
    SpecialityComponent,
    LevelComponent,
    ModuleComponent,
    PaginationComponent,
    StudentComponent,
    CreateStudentComponent,
    StudentExamListComponent,
    ExamListComponent,
    StudentsAnswersDetailsComponent
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
    CreateStudentService,
    StudentExamListService,
    ExamListService,
    StudentsAnswersDetailsService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
