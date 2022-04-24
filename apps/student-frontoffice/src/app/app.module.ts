import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, ROUTING } from '../routing/app-routing.module';

import { HeaderComponent, FooterComponent, PageNotFoundComponent} from '../core/components';
import { ExamInformationCardComponent, PageTitleComponent, PaginationComponent } from '../shared/components';
import { WebcamComponent, NotificationComponent, TakenExamsComponent, TakeExamComponent, ScheduledExamsComponent } from '../modules';


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
    PageTitleComponent,
    PaginationComponent,
    PageNotFoundComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, ROUTING],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
