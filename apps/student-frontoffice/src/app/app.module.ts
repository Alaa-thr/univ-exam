import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, ROUTING } from '../routing/app-routing.module';
import { CountdownModule } from 'ngx-countdown';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import {
  HeaderComponent,
  FooterComponent,
  PageNotFoundComponent,
} from '../core/components';
import {
  ExamInformationCardComponent,
  PaginationComponent,
} from '../shared/components';
import {
  WebcamComponent,
  NotificationComponent,
  TakenExamsComponent,
  TakeExamComponent,
  ScheduledExamsComponent,
} from '../modules';
import { LogoutGuard } from '../core/guards/logout.guard';
import { LoginGuard } from '../core/guards/login.guard';
import { LoginComponent } from '../core/components/login/login.component';
import { ScheduledExamsService } from '../modules/scheduled-exams/scheduled-exams.service';
import { LoginInterceptorProvider } from '../core/interceptors/login.interceptor';
import { TakenExamsService } from '../modules/taken-exams/taken-exams.service';
import { NotificationService } from '../modules/notification/notification.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ExamDetailsComponent } from '../modules/exam-details/exam-details.component';
import { ExamDetailsService } from '../modules/exam-details/exam-details.service';
import { TakeExamService } from '../modules/take-exam/take-exam.service';
import { ExamPreparationComponent } from '../modules/exam-preparation/exam-preparation.component';
import { ExamPreparationService } from '../modules/exam-preparation/exam-preparation.service';
import { RecordVideoComponent } from '../modules/record-video/record-video.component';
import {
  CapitalizeLetterPipe,
  QuestionMarkPipe,
  SeparateWordsPipe,
} from '@univ-exam/common';
import { ProfileComponent } from '../modules/profile/profile.component';
import { GetTokenService } from '../shared/services/get-token.service';
import { HeaderService } from '../core/components/header/header.service';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrCodeReaderComponent } from '../modules/qr-code-reader/qr-code-reader.component';

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
    QuestionMarkPipe,
    ExamPreparationComponent,
    RecordVideoComponent,
    ProfileComponent,
    QrCodeReaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ROUTING,
    NgxPaginationModule,
    CountdownModule,
    NgxQRCodeModule,
    ZXingScannerModule
    
  ],
  providers: [
    LoginGuard,
    LogoutGuard,
    ScheduledExamsService,
    LoginInterceptorProvider,
    TakenExamsService,
    NotificationService,
    ExamDetailsService,
    TakeExamService,
    ExamPreparationService,
    GetTokenService,
    HeaderService,
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AppModule {}
