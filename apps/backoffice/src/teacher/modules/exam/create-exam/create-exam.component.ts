import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IAnswer, IExamType, IInputType, ILevel, IModule, ISpeciality, IStudent } from '@univ-exam/common';
import { ISpecialityModuleLevel } from '@univ-exam/common';
import Swal from 'sweetalert2';
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
  inputTypes: IInputType[] = [];
  specialities: ISpeciality[] = [];
  levels: ILevel[] = [];
  modules: IModule[] = []; 
  specialityId: string;
  levelId: string;
  specialityLevelModule: ISpecialityModuleLevel[] = [];
  students: any = [];
  addExamError: number;
  trueIsSelectedInAnswer = true;
  answersDetails: any[] = [];
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
      'specialityModuleLevel': this.fb.control('',[
        Validators.required
      ]),
      'startHour': this.fb.control('',[
        Validators.required
      ]),
      'endHour': this.fb.control('',[
        Validators.required,
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
    this.createExamForm.setValidators(this.checkTime())
    this.questionForm = this.initQuestion();
    this.questionsList.splice(0,1); 
  }

  ngOnInit(): void {
    this.createExamService.getExamType().subscribe(
      (response) => {
        this.examTypes = response.items;
      },(error)=>{
        console.log('CreateExam Component error', error);
      }
    );
    this.createExamService.getInputType().subscribe(
      (response) => {
        this.inputTypes = response.items;
      },(error)=>{
        console.log('CreateExam Component error', error);
      }
    );
    this.createExamService.getSpeciality().subscribe(
      (response) => {
        this.specialities = response.items;
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
  }
  getStudents(specialityId: string, levelId: string){
    this.createExamService.getStudentsBySpecialityLevel(specialityId,levelId).subscribe(
      (response) =>{
        this.students = response;
      },
      (error) => {
        console.log('CreateExam Component error', error);
      }
    )
  }
  addQuestion(){
    const qstWithAnswers = this.questionForm.value;
    this.questionsList.push(qstWithAnswers);
    this.createExamForm.value.questions.push(qstWithAnswers);
    this.questionForm.reset();
    const answersLength = this.getansewrs().length;
    for(let i=0; i< answersLength-1; i++){
      this.getansewrs().controls.pop();
    }
  }
  addAnswer(){
    this.getansewrs().push(this.initAnswer());
  }
  initAnswer() {
    return new FormGroup({
      'title': this.fb.control('',[
        Validators.required,
        Validators.minLength(1),
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
        ],Validators.minLength(2))
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
  setSpecialityModuleLevel(event: any){
    this.createExamForm.controls['specialityModuleLevel'].setValue(this.initSpecialityModuleLevel(event.target.value));
  }
  initSpecialityModuleLevel(moduleId: string){
    const index = this.specialityLevelModule.findIndex(object => {
      return object.level.id === this.levelId && object.module.id === moduleId;
    });
    return this.specialityLevelModule[index].id;
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
        this.createExamForm.reset();
        this.modules = [];
        this.levels =[];
        this.questionsList = [];
        this.addExamError = 0;
        Swal.fire(
          'Creates!',
          'The exam has been created successfully.',
          'success'
        );
      },(error)=>{
        this.addExamError++;
        console.log('CreateExam Component error', error);
      }
    );
  }
  showStudents(url:string) {
    this.createExamService.redirectToStudentsList(url);
    
  }
  deleteAnswerItem(index: number){
    this.getansewrs().removeAt(index);
  }
  checkTime():ValidatorFn{
    return (group: AbstractControl): ValidationErrors | null => {
      const startTime = group.value.startHour;
      const endTime = group.value.endHour;
      if (startTime > endTime) {
        return {notEquivalent: true};
      } else {
        return null;
      }
    };
  }
  changeSelectInAnswers(){
    let j = 0;
    if(this.questionForm.value.inputType === 'radio'){
      const answers = this.questionForm.value.answers;
      for(let i=0; i< answers.length; i++){
        if(answers[i].isCorrect){
          this.trueIsSelectedInAnswer = false;
          j++;
        }
      }
      if(!j) this.trueIsSelectedInAnswer = true;
    }else{
      this.trueIsSelectedInAnswer = true;
    }
  }
  getAnswersDetails(index: number){
    this.answersDetails = this.questionsList[index].answers;
  }
  deleteQuestionItem(index: number){
    this.questionsList.splice(index, 1);
    (this.createExamForm.get('questions') as FormArray).value.splice(index+1,1);
  }
  updateQst(index: number){
    const qst = this.createExamForm.value.questions[index+1];
    for(let i=0; i< qst.answers.length-1; i++){
      this.getansewrs().push(this.initAnswer());
    }
    this.questionForm.setValue(qst);
    this.deleteQuestionItem(index);
  }
}
