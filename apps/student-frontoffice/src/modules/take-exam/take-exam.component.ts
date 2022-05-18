import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TakeExamService } from './take-exam.service';

@Component({
  selector: 'univ-exam-take-exam',
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.css'],
})
export class TakeExamComponent implements OnInit, AfterViewInit, OnDestroy{

  @ViewChild('fullScreen',{static: false}) fullScreenDivRef: any;
  examDetails: any;
  leftTime: number;
  multiStepScript: any;
  form: FormGroup;
  selectedOption: boolean;
  oneAnswerSelectedAtLeast: boolean;
  elem: any;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly takeExamService: TakeExamService,
    private readonly router: Router,
    private fb: FormBuilder,
    @Inject(DOCUMENT) private document: any
  ) {
    this.examDetails = [];
    this.leftTime = 0;
    this.oneAnswerSelectedAtLeast = true;
    this.selectedOption = false;
    this.form = this.fb.group({
      'questions': this.fb.array([
        this.fb.group({
          'qst': this.fb.control(''),
          'ansewrs':this.fb.array([
            this.fb.control('')
          ], Validators.minLength(2))
        })
      ])
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => { 
        const examId = params['id'];
        this.takeExamService.getScheduledExamById(examId).subscribe(
          (response) => {
            this.examDetails = response;
            this.leftTime = this.getTimeLeft(this.examDetails.startHour, this.examDetails.endHour);
            Swal.fire({
              title: 'Get Started',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Start'
            }).then((result) => {
              if (result.isConfirmed) {
                this.openFullscreen();
              }else{
                this.goHome();
              }
            })
          },(error)=>{
            console.log('ExamDetails Component error', error);
          }
        );
      }
    ); 
  }

  ngAfterViewInit():void{
    this.elem = this.fullScreenDivRef.nativeElement; 
    this.multiStepScript=document.createElement("script");
    this.multiStepScript.type="text/javascript";
    this.multiStepScript.src="assets/js/bootstrap-multi-step-form.js";
    document.body.appendChild(this.multiStepScript);
  }

  ngOnDestroy(): void {
    document.body.removeChild(this.multiStepScript);
  }
  private get questions():FormArray{
    return this.form.get('questions') as FormArray;
  }
  setSelectedValue(selected: any, questionId: string):void{
    this.selectedOption = true;
    this.addAnswerToQuestion(selected.target.value, questionId);
  }
  addAnswerToQuestion(answerId: string, questionId: string):void{
    const allQuestions = this.questions.value;
    const questionIndex = allQuestions.findIndex((obj: { qst: string; }) => obj.qst === questionId);
    const newElement = {
      qst: questionId,
      answers: [answerId]
    };
    if (questionIndex === -1) {
      allQuestions.push(newElement);
    }else{
      const allAnswersOfQuestion = allQuestions[questionIndex].answers;
      const answerIndex = allAnswersOfQuestion.findIndex((obj: string) => obj === answerId);
      if(answerId == ''){ //case of select the default option "Select an answer"
        allAnswersOfQuestion.splice(0,allAnswersOfQuestion.length);
      }
      else if(this.selectedOption == true){ // case of the answer is in select
        allAnswersOfQuestion.splice(0,allAnswersOfQuestion.length);
        allAnswersOfQuestion.push(answerId);
        
      }else{ //case of the answer is in the checkbox
        if(answerIndex === -1){
          allAnswersOfQuestion.push(answerId);
        }else{
          allAnswersOfQuestion.splice(answerIndex, 1);
        }
      } 
      if(allAnswersOfQuestion.length == 0){ // the case of allAnswersOfQuestion array is empty
        allQuestions.splice(questionIndex,1);
      } 
    }
    this.selectedOption = false;
    this.setOneAnswerSelectedAtLeast(questionId);

  }
  onSubmit(){
    
    this.takeExamService.addStudentAnswers(this.form.value).subscribe(
      (respone)=>{
        this.closeFullscreen();
        Swal.fire({
          title: 'Congratulations!',
          icon: 'success',
          text: "Your answers have been submitted successfully",
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6'
        }).then((result) => {
          this.goHome();
        })
      },
      (error)=>{
        console.log('ExamDetails Component error', error);
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

  private goHome(): void{
    const link = "exam/scheduled-exams";
    this.router.navigate([link]);
  }

  setOneAnswerSelectedAtLeast(questionId: string): void{
    const allQuestions = this.questions.value;
    const questionIndex = allQuestions.findIndex((obj: { qst: string; }) => obj.qst === questionId);
    if (questionIndex === -1) {
      this.oneAnswerSelectedAtLeast = true;
    }else{
      this.oneAnswerSelectedAtLeast = false;
    }
  }

  private openFullscreen(): void {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }
  private closeFullscreen(): void {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }
}
