import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateExamComponent } from '../teacher/modules/exam/create-exam/create-exam.component';
import { AppRoutingModule, ROUTING } from '../routing/app-routing.module';
import { SideBarComponent } from '../shared/components/side-bar/side-bar.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateExamService } from '../teacher/modules/exam/create-exam/create-exam.service';
import { HttpClientModule } from '@angular/common/http';
import {
  CapitalizeLetterPipe,
  QuestionMarkPipe,
  SeparateWordsPipe,
} from '@univ-exam/common';
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
import { ExamListService } from '../teacher/modules/exam/exam-list/exam-list.service';
import { StudentsAnswersDetailsComponent } from '../teacher/modules/students-answers-details/students-answers-details.component';
import { StudentsAnswersDetailsService } from '../teacher/modules/students-answers-details/students-answers-details.service';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../shared/services/auth.service';
import { HeaderService } from '../shared/components/header/header.service';
import { GetTokenService } from '../shared/services/get-token.service';
import { LoginGuard } from '../shared/guards/login.guard';
import { LogoutGuard } from '../shared/guards/logout.guard';
import { LoginInterceptorProvider } from '../shared/interceptors/login.interceptor';
import { SideBarService } from '../shared/components/side-bar/side-bar.service';
import { CreateAdminComponent } from '../admin/modules/admin/create-admin/create-admin.component';
import { CreateAdminService } from '../admin/modules/admin/create-admin/create-admin.service';
import { IsAdminGuard } from '../shared/guards/isAdmin.guard';
import { IsTeacherGuard } from '../shared/guards/isTeacher.guard';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { BlankPathGuard } from '../shared/guards/blank-path.guard';
import { UnauthorizedComponent } from '../unauthorized/unauthorized.component';
import { ExamTypeComponent } from '../admin/modules/examType/exam-type.component';
import { InputTypeComponent } from '../admin/modules/inputType/input-type.component';
import { ExamTypeService } from '../admin/modules/examType/exam-type.service';
import { InputTypeService } from '../admin/modules/inputType/input-type.service';
import { TeacherComponent } from '../admin/modules/teacher/all-teachers/teacher.component';
import { TeacherService } from '../admin/modules/teacher/all-teachers/teacher.service';
import { CreateTeacherComponent } from '../admin/modules/teacher/create-teacher/create-teacher.component';
import { CreateTeacherService } from '../admin/modules/teacher/create-teacher/create-teacher.service';
import { UpdateTeacherService } from '../admin/modules/teacher/update-teacher/update-teacher.service';
import { UpdateTeacherComponent } from '../admin/modules/teacher/update-teacher/update-teacher.component';
import { AdminComponent } from '../admin/modules/admin/all-admins/admin.component';
import { AdminService } from '../admin/modules/admin/all-admins/admin.service';
import { UpdateAdminService } from '../admin/modules/admin/update-admin/update-admin.service';
import { UpdateAdminComponent } from '../admin/modules/admin/update-admin/update-admin.component';
import { UpdateStudentComponent } from '../admin/modules/student/update-student/update-student.component';
import { UpdateStudentService } from '../admin/modules/student/update-student/update-student.service';

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
    StudentsAnswersDetailsComponent,
    LoginComponent,
    CreateAdminComponent,
    PageNotFoundComponent,
    UnauthorizedComponent,
    ExamTypeComponent,
    InputTypeComponent,
    TeacherComponent,
    CreateTeacherComponent,
    UpdateTeacherComponent,
    AdminComponent,
    UpdateAdminComponent,
    UpdateStudentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ROUTING,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
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
    StudentsAnswersDetailsService,
    AuthService,
    HeaderService,
    GetTokenService,
    LoginGuard,
    LogoutGuard,
    LoginInterceptorProvider,
    SideBarService,
    CreateAdminService,
    IsAdminGuard,
    IsTeacherGuard,
    BlankPathGuard,
    ExamTypeService,
    InputTypeService,
    TeacherService,
    CreateTeacherService,
    UpdateTeacherService,
    AdminService,
    UpdateAdminService,
    UpdateStudentService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
