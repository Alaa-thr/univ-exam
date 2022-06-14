import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IExamType, ILevel, IModule, ISpeciality, IStudent } from '@univ-exam/common';
import { ISpecialityModuleLevel } from '@univ-exam/common';
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
    answers: [{
      title: '',
      isCorrect: false
    }]
  }];
  examTypes: IExamType[] = [];
  specialities: ISpeciality[] = [];
  levels: ILevel[] = [];
  modules: IModule[] = []; 
  specialityId: string;
  levelId: string;
  specialityLevelModule: ISpecialityModuleLevel[] = [];
  students: any = [];
  addExamError: number;
  constructor(
    private readonly fb: FormBuilder,
    private readonly createExamService: CreateExamService,
  ) {
    this.addExamError = 0;
    this.specialityId = '';
    this.levelId = '';
    this.createExamForm = this.fb.group({
      'title': this.fb.control('',[
        Validators.required,
        Validators.minLength(3),
      ]),
      'examType': this.fb.control('',[
        Validators.required
      ]),
      'isPublished': this.fb.control(false),
      'module': this.fb.control('',[
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
      'students': this.fb.control(''),
      'questions': this.fb.array([
        new FormGroup({
          'text': this.fb.control(''),
          'inputType': this.fb.control(''),
          'point': this.fb.control(''),
          'answers': this.fb.array([
            new FormGroup({
              'title': this.fb.control(''),
              'isCorrect': this.fb.control(false)
            })
          ])
        }) 
      ])
    });
    this.questionForm = this.initQuestion();
    this.questionsList.splice(0,1); 
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
    this.specialityId = event.target.value;
    this.createExamService.getLevelsModulesBySpeciality(this.specialityId).subscribe(
      (response) => {
        this.levels = [];
        this.modules = [];
        this.specialityLevelModule = response;
        for(let i=0; i< this.specialityLevelModule.length; i++){
          const index = this.levels.findIndex(object => {
            return object.id === this.specialityLevelModule[i].level.id;
          });
          if(index == -1){
            this.levels.push(this.specialityLevelModule[i].level)
          }
        }
        this.levels.sort((a, b) => a.name.localeCompare(b.name))
      },(error)=>{
        console.log('CreateExam Component error', error);
      }
    );
  }
  getModule(event: any){
    this.modules = [];
    this.levelId = event.target.value;
    for(let i=0; i< this.specialityLevelModule.length; i++){
      if(this.specialityLevelModule[i].module && this.specialityLevelModule[i].level.id == this.levelId){
        this.modules.push(this.specialityLevelModule[i].module)
      }
    }
    this.getStudents(this.specialityId,this.levelId);
    console.log("modules", this.modules)
    console.log("this.specialityLevelModule", this.specialityLevelModule)
    console.log("form", this.createExamForm)
  }
  getStudents(specialityId: string, levelId: string){
    this.createExamService.getStudentsBySpecialityLevel(specialityId,levelId).subscribe(
      (response) =>{
        this.students = response;
        console.log("students", response)
        
        console.log("students", response)
        console.log("this.createExamForm.value", this.createExamForm.value)
      },
      (error) => {
        console.log('CreateExam Component error', error);
      }
    )
  }
  addQuestion(){
    const qstWithAnswers = this.questionForm.value;
    this.questionsList.push(qstWithAnswers);
    
    console.log("qstWithAnswers",qstWithAnswers)
    this.createExamForm.value.questions.push(qstWithAnswers);
    this.questionForm.reset();
    console.log("getansewrs",this.getansewrs().length)
    const answersLength = this.getansewrs().length;
    for(let i=0; i< answersLength-1; i++){
      this.getansewrs().controls.pop();
    }
    console.log("getansewrs after ",this.getansewrs().length)
    
    console.log("after form push", this.createExamForm)
  }
  addAnswer(){
    this.getansewrs().push(this.initAnswer());
  }
  initAnswer() {
    return new FormGroup({
      'title': this.fb.control('',[
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
        'answers': this.fb.array([
          this.initAnswer()
        ])
      });
  }

  get title() { 
    return this.createExamForm.get('title') as FormControl;
  }
  get isPublished() { 
    return this.createExamForm.get('isPublished') as FormControl;
  }
  get module() { 
    return this.createExamForm.get('module') as FormControl;
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
    return this.getansewrs().controls[answrIndex].get("title") as FormControl; 
  }
  isCorrect(answrIndex: number) { 
    return this.getansewrs().controls[answrIndex].get("isCorrect") as FormControl; 
  }
  getansewrs() : FormArray {
    return this.questionForm.get("answers") as FormArray
  }
  createExam(): void{
    if(this.addExamError == 0){
      this.createExamForm.value.questions.splice(0,1);
    }
    const startHour = this.createExamForm.value.startHour;
    const endHour = this.createExamForm.value.endHour;
    this.createExamForm.value.startHour = new Date('2000-01-01'+' '+startHour);
    this.createExamForm.value.endHour = new Date('2000-01-01'+' '+endHour);
    this.createExamForm.value.students = this.students;
    this.createExamService.addExam(this.createExamForm.value).subscribe(
      (response) => {
        this.levelId = '';
        this.specialityId = '';
        console.log(response)
        this.createExamForm.reset();
        this.modules = [];
        this.levels =[];
        this.questionsList = [];
        this.addExamError = 0;
      },(error)=>{
        this.addExamError++;
        console.log('CreateExam Component error', error);
      }
    );
  }
  showStudents(url:string) {
    window.open("http://localhost:4201/"+url, '_blank');
  }
}