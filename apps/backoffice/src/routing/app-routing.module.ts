import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateExamComponent } from '../teacher/modules/create-exam/create-exam.component';

const APP_ROUTING: Routes = [ 

  {
    path: 'create-exam', 
    component: CreateExamComponent,
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
