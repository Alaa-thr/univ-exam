import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TakeExamService } from './take-exam.service';

@Component({
  selector: 'univ-exam-take-exam',
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.css'],
})
export class TakeExamComponent implements OnInit, AfterViewInit, OnDestroy{

  examDetails: any;
  leftTime: number;
  multiStepScript: any;
  form: FormGroup;
  selectedOption: boolean;
  oneAnswerSelectedAtLeast: boolean;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly takeExamService: TakeExamService,
    private readonly router: Router,
    private fb: FormBuilder
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
    })
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

  ngAfterViewInit():void{
    this.multiStepScript=document.createElement("script");
    this.multiStepScript.type="text/javascript";
    this.multiStepScript.src="assets/js/bootstrap-multi-step-form.js"; //external script
    document.body.appendChild(this.multiStepScript);  
  }

  ngOnDestroy(): void {
    document.body.removeChild(this.multiStepScript);
  }
  get questions():FormArray{
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
    console.log('index', questionIndex)
    console.log("this.questions.value ",this.questions.value)

  }
  onSubmit(){
    console.log("data ",this.form.value)
  }

  getTimeLeft(startHour: Date, endHour: Date):number{
    const startValue = new Date("01/01/2007 " + startHour);
    const endValue = new Date("01/01/2007 " + endHour);
    const min = Math.floor((endValue.getTime()-startValue.getTime())/60000);
    const sec = min*60;
    return sec;
  }

  goHome(): void{
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
}
