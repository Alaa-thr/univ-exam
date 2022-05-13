import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TakeExamService } from './take-exam.service';

@Component({
  selector: 'univ-exam-take-exam',
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.css'],
})
export class TakeExamComponent implements OnInit {

  node: any;
  examDetails: any;
  leftTime: number;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly takeExamService: TakeExamService,
    private readonly router: Router
  ) {
    this.examDetails = [];
    this.leftTime = 0;
  }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(
      (params) => { 
        const examId = params['id'];
        this.takeExamService.getScheduledExamById(examId).subscribe(
          (response) => {
            this.examDetails = response;
            this.leftTime = this.getTimeLeft(this.examDetails.startHour, this.examDetails.endHour);
            console.log(this.examDetails)
          },(error)=>{
            console.log('ExamDetails Component error', error);
          }
        );
      }
    ); 
  }

  getTimeLeft(startHour: Date, endHour: Date):number{
    const startValue = new Date("01/01/2007 " + startHour);
    const endValue = new Date("01/01/2007 " + endHour);
    const min = Math.floor((endValue.getTime()-startValue.getTime())/60000);
    const sec = min*60;
    return sec;
  }

  goHome(){
    const link = "exam/scheduled-exams";
    this.router.navigate([link]);
  }

}
