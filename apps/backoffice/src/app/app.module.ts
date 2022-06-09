import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateExamComponent } from '../teacher/modules/create-exam/create-exam.component';
import { AppRoutingModule, ROUTING } from '../routing/app-routing.module';
import { SideBarComponent } from '../shared/components/side-bar/side-bar.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateExamService } from '../teacher/modules/create-exam/create-exam.service';
import { HttpClientModule } from '@angular/common/http';
import { CapitalizeLetterPipe, SeparateWordsPipe } from '@univ-exam/common';
import { CreateSpecialityComponent } from '../admin/modules/speciality/create-speciality/create-speciality.component';
import { CreateLevelComponent } from '../admin/modules/level/create-level/create-level.component';
import { CreateModuleComponent } from '../admin/modules/modulee/create-module/create-module.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateExamComponent,
    SideBarComponent,
    HeaderComponent,
    SeparateWordsPipe,
    CapitalizeLetterPipe,
    CreateSpecialityComponent,
    CreateLevelComponent,
    CreateModuleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ROUTING,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [CreateExamService],
  bootstrap: [AppComponent],
})
export class AppModule {}
