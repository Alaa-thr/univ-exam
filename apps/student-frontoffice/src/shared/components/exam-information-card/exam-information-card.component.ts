
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { calculeTime } from '../../functions/commonFunction';

@Component({
  selector: 'univ-exam-exam-information-card',
  templateUrl: './exam-information-card.component.html',
  styleUrls: ['./exam-information-card.component.css']
})
export class ExamInformationCardComponent implements OnInit {

  @Input() exams: any[];
  @Input() todayDateTime: any;
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

  startNow(examIndex: number): boolean{
    const todayTime = this.todayDateTime.time;
    const todayDate = this.todayDateTime.date;
    const date = new Date(todayDate+' '+todayTime)
    const examDate = new Date(this.exams[examIndex].exam.date+' '+this.exams[examIndex].exam.startHour)
    if(examDate < date){
      return false;
    }
    return true;
  }
  getTime(startHour: string, endHour: string){
    return calculeTime(startHour,endHour);
  }

  goTakeExam(examId: string){
    const link ="exam/scheduled-exams/"+examId;
    this.router.navigateByUrl(link);
  }
}
