import { Component, OnInit } from '@angular/core';
import { ScheduledExamsService } from './scheduled-exams.service';

@Component({
  selector: 'univ-exam-scheduled-exams',
  templateUrl: './scheduled-exams.component.html',
  styleUrls: ['./scheduled-exams.component.css'],
})
export class ScheduledExamsComponent implements OnInit {

  scheduledExams: any[];
  startExamTime: any;
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
        this.startExamTime = response.startedExam;
        console.log(this.startExamTime)
      },
      (error) => {
        console.log('ScheduledExams Component error', error);
      }
    );
  }
}
