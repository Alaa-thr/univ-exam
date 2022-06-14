import { AfterContentChecked, AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamDetailsService } from './exam-details.service';

@Component({
  selector: 'univ-exam-exam-details',
  templateUrl: './exam-details.component.html',
  styleUrls: ['./exam-details.component.css'],
})
export class ExamDetailsComponent implements OnInit,AfterContentChecked {

  examDetails: any;
  selectIsValid: boolean;
  correctAnswerInSelect: string;
  constructor(
    private readonly examDetailsService: ExamDetailsService,
    private readonly activatedRoute: ActivatedRoute,
    private cdRef:ChangeDetectorRef
  ) {
    this.examDetails = [];
    this.selectIsValid = false;
    this.correctAnswerInSelect = "";
  }
  setSelectIsValid(selectIsValid: boolean){
    this.selectIsValid = selectIsValid;  
  }
  setCorrectAnswerInSelect(correctAnswerInSelect: string){
    this.correctAnswerInSelect =  correctAnswerInSelect;
  }
  ngAfterContentChecked():void{
    this.cdRef.detectChanges();
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => { 
        const examId = params['id'];
        this.examDetailsService.getTakenExamsById(examId).subscribe(
          (response) => {
            this.examDetails = response;
          },(error)=>{
            console.log('ExamDetails Component error', error);
          }
        );
      }
    )  
  }
}
