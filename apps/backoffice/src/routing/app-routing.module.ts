import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateExamComponent } from '../teacher/modules/exam/create-exam/create-exam.component';
import { SpecialityComponent } from '../admin/modules/speciality/speciality.component';
import { ModuleComponent } from '../admin/modules/modulee/module.component';
import { LevelComponent } from '../admin/modules/level/level.component';
import { CreateStudentComponent } from '../admin/modules/student/create-student/create-student.component';
import { StudentComponent } from '../admin/modules/student/all-students/student.component';
import { StudentExamListComponent } from '../teacher/modules/student-exam-list/student-exam-list.component';
import { ExamListComponent } from '../teacher/modules/exam/exam-list/exam-list.component';
import { StudentsAnswersDetailsComponent } from '../teacher/modules/students-answers-details/students-answers-details.component';
import { LoginComponent } from '../login/login.component';
import { LogoutGuard } from '../shared/guards/logout.guard';
import { LoginGuard } from '../shared/guards/login.guard';
import { CreateAdminComponent } from '../admin/modules/admin/create-admin/create-admin.component';
import { IsAdminGuard } from '../shared/guards/isAdmin.guard';
import { IsTeacherGuard } from '../shared/guards/isTeacher.guard';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { BlankPathGuard } from '../shared/guards/blank-path.guard';
import { UnauthorizedComponent } from '../unauthorized/unauthorized.component';
import { ExamTypeComponent } from '../admin/modules/examType/exam-type.component';
import { InputTypeComponent } from '../admin/modules/inputType/input-type.component';
import { TeacherComponent } from '../admin/modules/teacher/all-teachers/teacher.component';
import { CreateTeacherComponent } from '../admin/modules/teacher/create-teacher/create-teacher.component';
import { UpdateTeacherComponent } from '../admin/modules/teacher/update-teacher/update-teacher.component';

const APP_ROUTING: Routes = [
  {
    path: 'teachers',
    component: TeacherComponent,
    canActivate: [LoginGuard, IsAdminGuard],
  },
  {
    path: 'teachers/create',
    component: CreateTeacherComponent,
    canActivate: [LoginGuard, IsAdminGuard],
  },
  {
    path: 'teachers/update/:id',
    component: UpdateTeacherComponent,
    canActivate: [LoginGuard, IsAdminGuard],
  },
  {
    path: 'create-exam',
    component: CreateExamComponent,
    canActivate: [LoginGuard, IsTeacherGuard],
  },
  {
    path: 'exam-list',
    component: ExamListComponent,
    canActivate: [LoginGuard, IsTeacherGuard],
  },
  {
    path: 'students-answers-list/:examId/:studentId',
    component: StudentsAnswersDetailsComponent,
    canActivate: [LoginGuard, IsTeacherGuard],
  },
  {
    path: 'speciality',
    component: SpecialityComponent,
    canActivate: [LoginGuard, IsAdminGuard],
  },
  {
    path: 'create-admin',
    component: CreateAdminComponent,
    canActivate: [LoginGuard, IsAdminGuard],
  },
  {
    path: 'level',
    component: LevelComponent,
    canActivate: [LoginGuard, IsAdminGuard],
  },
  {
    path: 'students-list',
    component: StudentComponent,
    canActivate: [LoginGuard, IsAdminGuard],
  },
  {
    path: 'create-student',
    component: CreateStudentComponent,
    canActivate: [LoginGuard, IsAdminGuard],
  },
  {
    path: 'module',
    component: ModuleComponent,
    canActivate: [LoginGuard, IsAdminGuard],
  },
  {
    path: 'exam-type',
    component: ExamTypeComponent,
    canActivate: [LoginGuard, IsAdminGuard],
  },
  {
    path: 'input-type',
    component: InputTypeComponent,
    canActivate: [LoginGuard, IsAdminGuard],
  },
  {
    path: 'students-list/:specialityId/:levelId',
    component: StudentExamListComponent,
    canActivate: [LoginGuard, IsTeacherGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LogoutGuard],
  },
  {
    path: '',
    component: LoginComponent,
    canActivate: [LoginGuard, BlankPathGuard],
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
    canActivate: [LoginGuard],
  },

  {
    path: '**',
    component: PageNotFoundComponent,
    canActivate: [LoginGuard],
  },
];
export const ROUTING = RouterModule.forRoot(APP_ROUTING);

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class AppRoutingModule {}
