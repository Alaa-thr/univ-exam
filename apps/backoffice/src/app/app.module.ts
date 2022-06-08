import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateExamComponent } from '../teacher/modules/create-exam/create-exam.component';
import { AppRoutingModule, ROUTING } from '../routing/app-routing.module';
import { SideBarComponent } from '../shared/components/side-bar/side-bar.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CreateExamComponent,
    SideBarComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    ROUTING,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
