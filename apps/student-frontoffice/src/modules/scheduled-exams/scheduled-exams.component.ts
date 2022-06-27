import { Component, OnInit } from '@angular/core';
import { IExamType } from '@univ-exam/common';
import { HeaderService } from '../../core/components/header/header.service';
import { ScheduledExamsService } from './scheduled-exams.service';

@Component({
  selector: 'univ-exam-scheduled-exams',
  templateUrl: './scheduled-exams.component.html',
  styleUrls: ['./scheduled-exams.component.css'],
})
export class ScheduledExamsComponent implements OnInit {

  scheduledExams: any[];
  todayDateTime= {
    time: '',
    date: ''
  };
  todayTime: any;
  searchValue: string = '';
  searchExamType: string = '';
  examType: IExamType[] = [];
  constructor(
    private readonly scheduledExamsService: ScheduledExamsService,
    private readonly headerService: HeaderService
    ) {
    this.scheduledExams = [];
  }

  ngOnInit(): void {
    this.getExamStertedTimeByStudent();
    this.getScheduledExams();
    this.scheduledExamsService.getExamTypes().subscribe(
      (response) => {
        this.examType = response;
      },(error)=>{
        console.log('ScheduledExams Component error', error);
      }
    );
    this.headerService.search.subscribe((value) => { //recevoir l'evenement
      this.searchValue = value;
      this.searchExamType = '';
      this.getScheduledExams();
    });
  }
  getScheduledExams(){
    const query = {keyword:this.searchValue, type:this.searchExamType}
    this.scheduledExamsService.getScheduledExams(query).subscribe(
      (response) => {
        this.scheduledExams = response;
      },(error)=>{
        console.log('ScheduledExams Component error', error);
      }
    );
  }
  private getExamStertedTimeByStudent() {
    this.scheduledExamsService.startExam().then(
      (response) => {
        this.todayDateTime = response;
      },
      (error) => {
        console.log('ScheduledExams Component error', error);
      }
    );
  }
  setSearchExamType(){
    this.searchValue = '';
    this.getScheduledExams();
  }
}
