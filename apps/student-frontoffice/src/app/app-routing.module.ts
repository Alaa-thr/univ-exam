import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
import { RouterModule, Routes } from '@angular/router';
import { ScheduledExamsComponent } from './scheduled-exams/scheduled-exams.component';
import { TakeExamComponent } from './take-exam/take-exam.component';
import { TakenExamsComponent } from './taken-exams/taken-exams.component';
import { WebcamComponent } from './webcam/webcam.component';

const APP_ROUTING: Routes = [ 
    
  {path: 'notification', component: NotificationComponent},
  {path: 'scheduled-exams', component: ScheduledExamsComponent},
  {path: 'take-exam', component: TakeExamComponent},
  {path: 'taken-exams', component: TakenExamsComponent},
  {path: 'webcam', component: WebcamComponent},

  {path: '', redirectTo: 'scheduled-exams', pathMatch: 'full'},
]
export const ROUTING = RouterModule.forRoot(APP_ROUTING);

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
