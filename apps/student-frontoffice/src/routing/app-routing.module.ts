import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WebcamComponent, NotificationComponent, TakenExamsComponent, TakeExamComponent, ScheduledExamsComponent } from '../modules';
import { PageNotFoundComponent } from '../app/core/components';
import { LoginGuard } from '../app/core/guards/login.guard';
import { LogoutGuard } from '../app/core/guards/logout.guard';

const APP_ROUTING: Routes = [ 
    
  {
    path: 'notification', 
    component: NotificationComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'scheduled-exams', 
    component: ScheduledExamsComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'take-exam', 
    component: TakeExamComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'taken-exams', 
    component: TakenExamsComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'webcam', 
    component: WebcamComponent
  },
  {
    path: '', 
    component: PageNotFoundComponent,
    canActivate: [LogoutGuard] 
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
