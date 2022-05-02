import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, ROUTING } from '../routing/app-routing.module';

import { HeaderComponent, FooterComponent, PageNotFoundComponent} from './core/components';
import { ExamInformationCardComponent, PageTitleComponent, PaginationComponent } from '../shared/components';
import { WebcamComponent, NotificationComponent, TakenExamsComponent, TakeExamComponent, ScheduledExamsComponent } from '../modules';
import { LogoutGuard } from './core/guards/logout.guard';
import { LoginGuard } from './core/guards/login.guard';
import { LoginComponent } from './core/components/login/login.component';


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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, 
    AppRoutingModule, 
    ROUTING,
     
  ],
  providers: [LoginGuard,LogoutGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
