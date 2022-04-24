import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WebcamComponent, NotificationComponent, TakenExamsComponent, TakeExamComponent, ScheduledExamsComponent } from '../modules';
import { PageNotFoundComponent } from '../core/components';

const APP_ROUTING: Routes = [ 
    
  {
    path: 'notification', 
    component: NotificationComponent
  },
  {
    path: 'scheduled-exams', 
    component: ScheduledExamsComponent
  },
  {
    path: 'take-exam', 
    component: TakeExamComponent
  },
  {
    path: 'taken-exams', 
    component: TakenExamsComponent
  },
  {
    path: 'webcam', 
    component: WebcamComponent
  },
  {
    path: '', 
    redirectTo: 'scheduled-exams', 
    pathMatch: 'full'
  },
  {
    path: '**', 
    component: PageNotFoundComponent 
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
