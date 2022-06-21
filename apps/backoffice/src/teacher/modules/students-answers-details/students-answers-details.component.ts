import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from "apps/backoffice/src/environments/environment";
import { StudentsAnswersDetailsService } from './students-answers-details.service';

@Component({
  selector: 'univ-exam-students-answers-details',
  templateUrl: './students-answers-details.component.html',
  styleUrls: ['./students-answers-details.css'],
})
export class StudentsAnswersDetailsComponent implements OnInit,AfterContentChecked {

  examDetails: any;
  uploadsURL = environment.uploads;
   constructor(
     private readonly studentsAnswersDetailsService: StudentsAnswersDetailsService,
     private readonly activatedRoute: ActivatedRoute,
     private cdRef:ChangeDetectorRef
  ) {
    this.examDetails = null;
  }
  ngAfterContentChecked():void{
     this.cdRef.detectChanges();
  }
  ngOnInit(): void {
     this.activatedRoute.params.subscribe(
      (params) => { 
        const examId = params['examId'];
        const studentId = params['studentId'];
        this.studentsAnswersDetailsService.getStudentExamAnswers(examId,studentId).subscribe(
          (response) => {
            this.examDetails = response;
            this.uploadsURL = this.uploadsURL+response.videoPath;
          },(error)=>{
            console.log('ExamDetails Component error', error);
          }
        );
      }
    )  
  }
}
