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

const APP_ROUTING: Routes = [ 

  {
    path: 'create-exam', 
    component: CreateExamComponent,
  },
  {
    path: 'exam-list', 
    component: ExamListComponent,
  },
  {
    path: 'speciality', 
    component: SpecialityComponent,
  },
  {
    path: 'level', 
    component: LevelComponent,
  },
  {
    path: 'students-list', 
    component: StudentComponent,
  },
  {
    path: 'create-student', 
    component: CreateStudentComponent,
  },
  {
    path: 'module', 
    component: ModuleComponent,
  },
  {
    path: 'students-list/:specialityId/:levelId', 
    component: StudentExamListComponent,
  },
]
export const ROUTING = RouterModule.forRoot(APP_ROUTING);

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
