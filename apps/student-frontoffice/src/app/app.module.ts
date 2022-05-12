import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, ROUTING } from '../routing/app-routing.module';
import { CountdownModule } from 'ngx-countdown';

import { HeaderComponent, FooterComponent, PageNotFoundComponent} from '../core/components';
import { ExamInformationCardComponent, PaginationComponent } from '../shared/components';
import { WebcamComponent, NotificationComponent, TakenExamsComponent, TakeExamComponent, ScheduledExamsComponent } from '../modules';
import { LogoutGuard } from '../core/guards/logout.guard';
import { LoginGuard } from '../core/guards/login.guard';
import { LoginComponent } from '../core/components/login/login.component';
import { ScheduledExamsService } from '../modules/scheduled-exams/scheduled-exams.service';
import { LoginInterceptorProvider } from '../core/interceptors/login.interceptor';
import { CapitalizeLetterPipe } from '../core/pipes/capitalize-letter.pipe';
import { TakenExamsService } from '../modules/taken-exams/taken-exams.service';
import { NotificationService } from '../modules/notification/notification.service';
import { NgxPaginationModule} from 'ngx-pagination'
import { ExamDetailsComponent } from '../modules/exam-details/exam-details.component';
import { ExamDetailsService } from '../modules/exam-details/exam-details.service';
import { SeparateWordsPipe } from '../core/pipes/separate-words.pipe';
import { QuestionMarkPipe } from '../core/pipes/question-mark.pipe';
import { TakeExamService } from '../modules/take-exam/take-exam.service';

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
    CapitalizeLetterPipe,
    ExamDetailsComponent,
    SeparateWordsPipe,
    QuestionMarkPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    AppRoutingModule, 
    ROUTING,
    NgxPaginationModule,
    CountdownModule
     
  ],
  providers: [
    LoginGuard,
    LogoutGuard,
    ScheduledExamsService,
    LoginInterceptorProvider,
    TakenExamsService, 
    NotificationService, 
    ExamDetailsService,
    TakeExamService
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
