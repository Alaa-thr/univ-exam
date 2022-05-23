import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { calculeTime } from '../../shared/functions/commonFunction';
import { ExamPreparationService } from './exam-preparation.service';

@Component({
  selector: 'univ-exam-exam-preparation',
  templateUrl: './exam-preparation.component.html',
  styleUrls: ['./exam-preparation.component.css'],
})
export class ExamPreparationComponent implements OnInit {

  examDetails: any;
  nextStep: boolean;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly examPreperationService: ExamPreparationService
  ){
    this.examDetails = [];
    this.nextStep = true;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => { 
        const examId = params['id'];
        this.examPreperationService.getExamById(examId).subscribe(
          (response) => {
            this.examDetails = response;
           console.log("rexam", response)
          },(error)=>{
            console.log('ExamDetails Component error', error);
          }
        );
      }
    ); 
  }
  getTime(startHour: Date, endHour: Date){
    return calculeTime(startHour,endHour);
  }
  setNextStep(){
    this.nextStep = !this.nextStep;
  }
}
