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

const APP_ROUTING: Routes = [ 

  {
    path: 'create-exam', 
    component: CreateExamComponent,
    canActivate: [LoginGuard] 
  },
  {
    path: 'exam-list', 
    component: ExamListComponent,
    canActivate: [LoginGuard] 
  },
  {
    path: 'students-answers-list/:examId/:studentId', 
    component: StudentsAnswersDetailsComponent,
    canActivate: [LoginGuard] 
  },
  {
    path: 'speciality', 
    component: SpecialityComponent,
    canActivate: [LoginGuard] 
  },
  {
    path: 'level', 
    component: LevelComponent,
    canActivate: [LoginGuard] 
  },
  {
    path: 'students-list', 
    component: StudentComponent,
    canActivate: [LoginGuard] 
  },
  {
    path: 'create-student', 
    component: CreateStudentComponent,
    canActivate: [LoginGuard] 
  },
  {
    path: 'module', 
    component: ModuleComponent,
    canActivate: [LoginGuard] 
  },
  {
    path: 'students-list/:specialityId/:levelId', 
    component: StudentExamListComponent,
    canActivate: [LoginGuard] 
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LogoutGuard] 
  }
]
export const ROUTING = RouterModule.forRoot(APP_ROUTING);

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
