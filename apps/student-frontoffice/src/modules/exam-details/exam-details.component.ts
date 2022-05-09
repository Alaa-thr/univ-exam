import { Component, OnInit } from '@angular/core';
import { ExamDetailsService } from './exam-details.service';

@Component({
  selector: 'univ-exam-exam-details',
  templateUrl: './exam-details.component.html',
  styleUrls: ['./exam-details.component.css'],
})
export class ExamDetailsComponent implements OnInit {

  scheduledExams: any[];
  constructor(private readonly examDetailsService: ExamDetailsService) {
    this.scheduledExams = [];
  }

  ngOnInit(): void {
    this.examDetailsService.getScheduledExams().subscribe(
      (response) => {
        this.scheduledExams = response;
      },(error)=>{
        console.log('ScheduledExams Component error', error);
      }
    );
  }
}
