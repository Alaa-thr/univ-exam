import { Component, OnInit } from '@angular/core';
import { ScheduledExamsService } from './scheduled-exams.service';

@Component({
  selector: 'univ-exam-scheduled-exams',
  templateUrl: './scheduled-exams.component.html',
  styleUrls: ['./scheduled-exams.component.css'],
})
export class ScheduledExamsComponent implements OnInit {

  scheduledExams: any[];
  constructor(private readonly scheduledExamsService: ScheduledExamsService) {
    this.scheduledExams = [];
  }

  ngOnInit(): void {
    this.scheduledExamsService.getScheduledExams().subscribe(
      (response) => {
        this.scheduledExams = response;
        console.log("this.scheduledExams ",this.scheduledExams);
      },(error)=>{
        console.log('ScheduledExams Component error', error)
      }
    );
  }
}
