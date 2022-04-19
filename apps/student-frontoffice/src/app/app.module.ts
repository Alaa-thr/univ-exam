import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ScheduledExamsComponent } from './scheduled-exams/scheduled-exams.component';
import { TakeExamComponent } from './take-exam/take-exam.component';
import { TakenExamsComponent } from './taken-exams/taken-exams.component';
import { ExamInformationCardComponent } from './shared/exam-information-card/exam-information-card.component';
import { WebcamComponent } from './webcam/webcam.component';
import { NotificationComponent } from './notification/notification.component';
import { PageTitleComponent } from './shared/page-title/page-title.component';
import { PaginationComponent } from './shared/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HeaderComponent,
    FooterComponent,
    ScheduledExamsComponent,
    TakeExamComponent,
    TakenExamsComponent,
    ExamInformationCardComponent,
    WebcamComponent,
    NotificationComponent,
    PageTitleComponent,
    PaginationComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
