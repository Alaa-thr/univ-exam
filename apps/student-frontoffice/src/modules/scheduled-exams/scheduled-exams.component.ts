import { Component, OnInit } from '@angular/core';
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
  constructor(private readonly scheduledExamsService: ScheduledExamsService) {
    this.scheduledExams = [];
  }

  ngOnInit(): void {
    this.scheduledExamsService.getScheduledExams().subscribe(
      (response) => {
        this.scheduledExams = response;
      },(error)=>{
        console.log('ScheduledExams Component error', error);
      }
    );
    this.getExamStertedTimeByStudent();
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
}
