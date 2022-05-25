import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WebcamComponent, NotificationComponent, TakenExamsComponent, TakeExamComponent, ScheduledExamsComponent } from '../modules';
import { PageNotFoundComponent } from '../core/components';
import { LoginGuard } from '../core/guards/login.guard';
import { LogoutGuard } from '../core/guards/logout.guard';
import { LoginComponent } from '../core/components/login/login.component';
import { ExamDetailsComponent } from '../modules/exam-details/exam-details.component';
import { ExamPreparationComponent } from '../modules/exam-preparation/exam-preparation.component';
import { RecordVideoComponent } from '../modules/record-video/record-video.component';

const APP_ROUTING: Routes = [ 
    
  {
    path: 'notification', 
    component: NotificationComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'exam',
    canActivate: [LoginGuard],
    children:[
      {
        path: 'scheduled-exams', 
        component: ScheduledExamsComponent,      
      },
      {
        path: 'taken-exams', 
        component: TakenExamsComponent,
      },
      {
        path: 'taken-exams/:id', 
        component: ExamDetailsComponent,      
      },
      {
        path: 'scheduled-exams/preparation-exam/:id', 
        component: ExamPreparationComponent,   
      },
      {
        path: 'scheduled-exams/preparation-exam/:id/start', 
        component: TakeExamComponent,      
      },
    ]
  },
  {
    path: 'webcam', 
    component: WebcamComponent
  },
  {
    path: 'recording-video', 
    component: RecordVideoComponent
  },
  {
    path: 'login', 
    component: LoginComponent,
    canActivate: [LogoutGuard] 
  },
  {
    path: '', 
    component: ScheduledExamsComponent,
    canActivate: [LoginGuard] 
  },
  {
    path: '**', 
    component: PageNotFoundComponent,
    canActivate: [LoginGuard] 
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
