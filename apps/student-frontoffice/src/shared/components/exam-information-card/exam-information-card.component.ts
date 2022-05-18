import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'univ-exam-exam-information-card',
  templateUrl: './exam-information-card.component.html',
  styleUrls: ['./exam-information-card.component.css']
})
export class ExamInformationCardComponent implements OnInit {

  @Input() exams: any[];
  circleClass: string = 'circle-warning';
  circleGraphClass: string = 'circle-graph-warning';
  dataPercent: number = 0;
  constructor(private readonly router: Router) {
    this.exams = [];
  }

  ngOnInit(): void {}

  getCircleClass(isDone:boolean, grade: number): boolean{
    if(!isDone){
      this.circleClass = 'circle-warning';
      this.circleGraphClass = 'circle-graph-warning';
      this.dataPercent = 0;
      return true;
    }else{
      this.dataPercent = (grade/20)*100;
      if(grade > 10){
        this.circleClass = 'circle-success';
        this.circleGraphClass = 'circle-graph-success';
        
        return true;
      }else{
        this.circleClass = 'circle-danger';
        this.circleGraphClass = 'circle-graph-danger';
        return true;
      }
    }
  }

  calculeTime(startHour: Date, endHour: Date){
    const startValue = new Date("01/01/2007 " + startHour);
    const endValue = new Date("01/01/2007 " + endHour);
    const min = Math.floor((endValue.getTime()-startValue.getTime())/60000);
    return min;
  }

  goTakeExam(examId: string){
    const link ="exam/scheduled-exams/"+examId;
    this.router.navigateByUrl(link);
  }
}
