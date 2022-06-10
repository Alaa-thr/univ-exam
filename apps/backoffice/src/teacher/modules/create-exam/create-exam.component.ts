import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IExamType, ILevel, IModule, ISpeciality } from '@univ-exam/common';
import { CreateExamService } from './create-exam.service';

@Component({
  selector: 'univ-exam-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css'],
})
export class CreateExamComponent implements OnInit {

  createExamForm: FormGroup;
  questionForm: FormGroup;
  questionsList = [{
    text: '',
    inputType: "",
    point: 0.25,
    ansewrs: [{
      text: '',
      isCorrect: false
    }]
  }];
  examTypes: IExamType[] = [];
  specialities: ISpeciality[] = [];
  levels: ILevel[] = [];
  Modules: IModule[] = []; 
  constructor(
    private readonly fb: FormBuilder,
    private readonly createExamService: CreateExamService,
  ) {
    this.createExamForm = this.fb.group({
      'title': this.fb.control('',[
        Validators.required,
        Validators.minLength(3),
      ]),
      'examType': this.fb.control('',[
        Validators.required
      ]),
      'startHour': this.fb.control('',[
        Validators.required
      ]),
      'endHour': this.fb.control('',[
        Validators.required
      ]),
      'date': this.fb.control('',[
        Validators.required
      ]),
      'questions': this.fb.array([
        new FormGroup({
          'text': this.fb.control(''),
          'inputType': this.fb.control(''),
          'point': this.fb.control(''),
          'ansewrs': this.fb.array([
            new FormGroup({
              'text': this.fb.control(''),
              'isCorrect': this.fb.control('')
            })
          ])
        }) 
      ])
    });
    this.questionForm = this.initQuestion();
    this.questionsList.splice(0,1); 
    console.log("this.questionsList",this.questionsList.length)
    //this.createExamForm.value.questions.splice(0,1)
  }

  ngOnInit(): void {
    this.createExamService.getExamType().subscribe(
      (response) => {
        this.examTypes = response;
        console.log("examType ",this.examTypes)
      },(error)=>{
        console.log('CreateExam Component error', error);
      }
    );
    this.createExamService.getSpeciality().subscribe(
      (response) => {
        this.specialities = response.items;
        console.log("speciality ",this.specialities)
      },(error)=>{
        console.log('CreateExam Component error', error);
      }
    );
  }

  getLevel(event: any){
    const specialityId = event.target.value;
    console.log("specialityId",specialityId)
    this.createExamService.getLevelsBySpeciality(specialityId).subscribe(
      (response) => {
        this.levels = response;
        console.log("level ",this.levels)
      },(error)=>{
        console.log('CreateExam Component error', error);
      }
    );
  }
  addQuestion(){
    const qstWithAnswers = this.questionForm.value;
    this.questionsList.push(qstWithAnswers)
    //this.createExamForm.controls[0].value.splice(0,1)
    console.log("qstWithAnswers",qstWithAnswers)
    this.createExamForm.value.questions.push(qstWithAnswers)
    this.questionForm.reset();
    console.log("after form push", this.createExamForm)
  }
  addAnswer(){
    this.getansewrs().push(this.initAnswer());
  }
  initAnswer() {
    return new FormGroup({
      'text': this.fb.control('',[
        Validators.required,
        Validators.minLength(3),
      ]),
      'isCorrect': this.fb.control('',[
        Validators.required
      ])
    });
  }
  initQuestion() {
    return new FormGroup({
        'text': this.fb.control('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        'inputType': this.fb.control('',[
          Validators.required
        ]),
        'point': this.fb.control('',[
          Validators.required
        ]),
        'ansewrs': this.fb.array([
          this.initAnswer()
        ])
      });
  }

  get title() { 
    return this.createExamForm.get('title') as FormControl;
  }
  get examType() { 
    return this.createExamForm.get('examType') as FormControl;
  }
  get startHour() { 
    return this.createExamForm.get('startHour') as FormControl;
  }
  get endHour() { 
    return this.createExamForm.get('endHour') as FormControl;
  }
  get date() { 
    return this.createExamForm.get('date') as FormControl;
  }
  get text() { 
    return this.questionForm.get('text') as FormControl;
  }
  get inputType() { 
    return this.questionForm.get('inputType') as FormControl;
  }
  get point() { 
    return this.questionForm.get('point') as FormControl; 
  }
  answerText(answrIndex: number) { 
    return this.getansewrs().controls[answrIndex].get("text") as FormControl; 
  }
  isCorrect(answrIndex: number) { 
    return this.getansewrs().controls[answrIndex].get("isCorrect") as FormControl; 
  }
  getansewrs() : FormArray {
    return this.questionForm.get("ansewrs") as FormArray
  }
  createExam(): void{
    console.log("createExamForm",this.createExamForm)
  }
}
