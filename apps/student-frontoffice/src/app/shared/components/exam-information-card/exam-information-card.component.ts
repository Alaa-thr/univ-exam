import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'univ-exam-exam-information-card',
  templateUrl: './exam-information-card.component.html',
  styleUrls: ['./exam-information-card.component.css']
})
export class ExamInformationCardComponent implements OnInit {

  @Input() scheduledExam: any;
  circleClass: string = 'circle-warning';
  circleGraphClass: string = 'circle-graph-warning';
  dataPercent: number = 0;
  constructor() {}

  ngOnInit(): void {}

  getDate(date: Date){
    return formatDate(date, 'dd-MM-yyyy', 'en-US');
  }

  getCircleClass(isDone:boolean, grade: number): boolean{
    if(!isDone){
      this.circleClass = 'circle-warning';
      this.circleGraphClass = 'circle-graph-warning';
      this.dataPercent = 0;
      return true;
    }else{
      if(grade > 10){
        this.circleClass = 'circle-success';
        this.circleGraphClass = 'circle-graph-success';
        this.dataPercent = grade;
        return true;
      }else{
        this.circleClass = 'circle-danger';
        this.circleGraphClass = 'circle-graph-danger';
        this.dataPercent = grade;
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
}
