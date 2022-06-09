import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateExamComponent } from '../teacher/modules/create-exam/create-exam.component';
import { CreateSpecialityComponent } from '../admin/modules/speciality/create-speciality/create-speciality.component';
import { CreateLevelComponent } from '../admin/modules/level/create-level/create-level.component';
import { CreateModuleComponent } from '../admin/modules/modulee/create-module/create-module.component';

const APP_ROUTING: Routes = [ 

  {
    path: 'create-exam', 
    component: CreateExamComponent,
  },
  {
    path: 'create-speciality', 
    component: CreateSpecialityComponent,
  },
  {
    path: 'create-level', 
    component: CreateLevelComponent,
  },
  {
    path: 'create-module', 
    component: CreateModuleComponent,
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
