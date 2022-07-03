import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  changeGrade = false;
  cheated = false;
  reCalculate = false;
  form: FormGroup;
  formCheated: FormGroup
  typeError: string;
  studentId: string;
  examId: string;
   constructor(
     private readonly studentsAnswersDetailsService: StudentsAnswersDetailsService,
     private readonly activatedRoute: ActivatedRoute,
     private cdRef:ChangeDetectorRef
  ) {
    this.examDetails = null;
    this.typeError = '';
    this.form = new FormGroup({
      'grade': new FormControl('',[
        Validators.required
      ]),
      'reason': new FormControl('',[
        Validators.required,
        Validators.minLength(2)
      ]),
    });
    this.formCheated = new FormGroup({
      'grade': new FormControl('-2'),
      'reason': new FormControl('',[
        Validators.required,
        Validators.minLength(2)
      ]),
    });
    this.studentId = '';
    this.examId = '';
  }
  setCheatedStudent(){
    this.form.value.grade = -2;
    console.log(this.form.value)
  }
  changeValue(){
    this.studentsAnswersDetailsService.setCheatedStudent(this.examId,this.studentId,this.formCheated.value).subscribe(
      (response) => {
        this.examDetails.grade = response.grade; 
        console.log(response)
      },(error)=>{
        console.log('ExamDetails Component error', error);
      }
    );
  }
  reCalculateGrade(){
    this.studentsAnswersDetailsService.reCalculateGrade(this.examId,this.studentId,this.examDetails.questions).subscribe(
      (response) => {
        this.examDetails.grade = response.grade; 
        console.log(response)
      },(error)=>{
        console.log('ExamDetails Component error', error);
      }
    );
  }
  get grade() { 
    return this.form.get('grade') as FormControl;
  }
  get reason() { 
    return this.form.get('reason') as FormControl;
  }
  ngAfterContentChecked():void{
     this.cdRef.detectChanges();
  }
  ngOnInit(): void {
     this.activatedRoute.params.subscribe(
      (params) => { 
        this.examId = params['examId'];
        this.studentId = params['studentId'];
        this.studentsAnswersDetailsService.getStudentExamAnswers(this.examId,this.studentId).subscribe(
          (response) => {
            this.examDetails = response;
            console.log(this.examDetails)
            this.uploadsURL = this.uploadsURL+response.videoPath;
          },(error)=>{
            console.log('ExamDetails Component error', error);
          }
        );
      }
    )  
  }
}
