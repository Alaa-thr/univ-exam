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
import { SpecialityComponent } from '../admin/modules/speciality/speciality.component';
import { SpecialityService } from '../admin/modules/speciality/speciality.service';
import { ModuleComponent } from '../admin/modules/modulee/module.component';
import { ModuleService } from '../admin/modules/modulee/module.service';
import { LevelComponent } from '../admin/modules/level/level.component';
import { LevelService } from '../admin/modules/level/level.service';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateExamComponent,
    SideBarComponent,
    HeaderComponent,
    SeparateWordsPipe,
    CapitalizeLetterPipe,
    SpecialityComponent,
    LevelComponent,
    ModuleComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ROUTING,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    CreateExamService,
    SpecialityService,
    ModuleService,
    LevelService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
