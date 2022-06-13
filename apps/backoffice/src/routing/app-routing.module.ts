import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateExamComponent } from '../teacher/modules/create-exam/create-exam.component';
import { SpecialityComponent } from '../admin/modules/speciality/speciality.component';
import { ModuleComponent } from '../admin/modules/modulee/module.component';
import { LevelComponent } from '../admin/modules/level/level.component';
import { CreateStudentComponent } from '../admin/modules/student/create-student/create-student.component';
import { StudentService } from '../admin/modules/student/all-students/student.service';
import { StudentComponent } from '../admin/modules/student/all-students/student.component';

const APP_ROUTING: Routes = [ 

  {
    path: 'create-exam', 
    component: CreateExamComponent,
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
]
export const ROUTING = RouterModule.forRoot(APP_ROUTING);

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
