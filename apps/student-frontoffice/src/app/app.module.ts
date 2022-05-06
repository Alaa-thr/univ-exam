import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, ROUTING } from '../routing/app-routing.module';

import { HeaderComponent, FooterComponent, PageNotFoundComponent} from './core/components';
import { ExamInformationCardComponent, PaginationComponent } from './shared/components';
import { WebcamComponent, NotificationComponent, TakenExamsComponent, TakeExamComponent, ScheduledExamsComponent } from '../modules';
import { LogoutGuard } from './core/guards/logout.guard';
import { LoginGuard } from './core/guards/login.guard';
import { LoginComponent } from './core/components/login/login.component';
import { ScheduledExamsService } from '../modules/scheduled-exams/scheduled-exams.service';
import { LoginInterceptorProvider } from './core/interceptors/login.interceptor';
import { CapitalizeFirstLetterPipe } from './core/pipes/capitalize-first-letter.pipe';
import { TakenExamsService } from '../modules/taken-exams/taken-exams.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ScheduledExamsComponent,
    TakeExamComponent,
    TakenExamsComponent,
    ExamInformationCardComponent,
    WebcamComponent,
    NotificationComponent,
    PaginationComponent,
    PageNotFoundComponent,
    LoginComponent,
    CapitalizeFirstLetterPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    AppRoutingModule, 
    ROUTING,
     
  ],
  providers: [LoginGuard,LogoutGuard,ScheduledExamsService,LoginInterceptorProvider,TakenExamsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
