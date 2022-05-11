import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamDetailsService } from './exam-details.service';

@Component({
  selector: 'univ-exam-exam-details',
  templateUrl: './exam-details.component.html',
  styleUrls: ['./exam-details.component.css'],
})
export class ExamDetailsComponent implements OnInit {

  examDetails: any;
  studentAnswers: any[];
  
  constructor(
    private readonly examDetailsService: ExamDetailsService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.studentAnswers = [];
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => { 
        const examId = params['id'];
        this.examDetailsService.getTakenExamsById(examId).subscribe(
          (response) => {
            this.examDetails = response.examDetails;
            this.studentAnswers = response.studentAnswewr;
            console.log(this.studentAnswers)
            console.log(this.examDetails)
          },(error)=>{
            console.log('ExamDetails Component error', error);
          }
        );
      }
    )  
  }
}
