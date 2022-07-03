import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IExamType,
  ILevel,
  IModule,
  ISpeciality,
  IStudent,
} from '@univ-exam/common';
import { ISpecialityModuleLevel } from '@univ-exam/common';
import Swal from 'sweetalert2';
import { UpdateExamService } from './update-exam.service';

@Component({
  selector: 'univ-exam-update-exam',
  templateUrl: './update-exam.component.html',
  styleUrls: ['./update-exam.component.css'],
})
export class UpdateExamComponent implements OnInit {
  updateExamForm: FormGroup;
  questionForm: FormGroup;
  questionsList = [
    {
      text: '',
      inputType: '',
      point: 0.25,
      answers: [
        {
          title: '',
          isCorrect: false,
        },
      ],
    },
  ];
  examTypes: IExamType[] = [];
  specialities: ISpeciality[] = [];
  levels: ILevel[] = [];
  modules: IModule[] = [];
  specialityId: string;
  levelId: string;
  specialityLevelModule: ISpecialityModuleLevel[] = [];
  students: any = [];
  addExamError: number;
  examId = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly updateExamService: UpdateExamService,
    private route: ActivatedRoute
  ) {
    this.addExamError = 0;
    this.specialityId = '';
    this.levelId = '';
    this.updateExamForm = this.fb.group({
      title: this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      examType: this.fb.control('', [Validators.required]),
      isPublished: this.fb.control(false),
      specialityModuleLevel: this.fb.control('', [Validators.required]),
      startHour: this.fb.control('', [Validators.required]),
      endHour: this.fb.control('', [Validators.required]),
      date: this.fb.control('', [Validators.required]),
      students: this.fb.control(''),
      questions: this.fb.array([
        new FormGroup({
          text: this.fb.control(''),
          inputType: this.fb.control(''),
          point: this.fb.control(''),
          answers: this.fb.array([
            new FormGroup({
              title: this.fb.control(''),
              isCorrect: this.fb.control(false),
            }),
          ]),
        }),
      ]),
    });
    this.questionForm = this.initQuestion();
    this.questionsList.splice(0, 1);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.examId = params['id'];
      this.fetchExam(params['id']);
    });
    this.updateExamService.getExamType().subscribe(
      (response) => {
        this.examTypes = response.items;
        console.log('examType ', this.examTypes);
      },
      (error) => {
        console.log('UpdateExam Component error', error);
      }
    );
    this.updateExamService.getSpeciality().subscribe(
      (response) => {
        this.specialities = response.items;
        console.log('speciality ', this.specialities);
      },
      (error) => {
        console.log('UpdateExam Component error', error);
      }
    );
  }

  fetchExam(id: string) {
    this.updateExamService.fetchExam(id).subscribe((exam: any) => {
      if (exam) {
        this.questionsList = exam.questions;
        this.specialityId = exam.specialityModuleLevel.speciality.id;
        this.levelId = exam.specialityModuleLevel.level.id;
        console.log('coco : ', {
          title: exam.title,
          inputType: exam.examType.id,
          isPublished: exam.isPublished,
          specialityModuleLevel: exam.specialityModuleLevel.id,
          startHour: exam.startHour,
          endHour: exam.endHour,
          date: exam.date,
          students: '',
          questions: this.questionsList,
        });
        this.updateExamForm.setValue({
          title: exam.title,
          examType: exam.examType.id,
          isPublished: exam.isPublished,
          specialityModuleLevel: exam.specialityModuleLevel.id,
          startHour: exam.startHour,
          endHour: exam.endHour,
          date: exam.date,
          students: '',
          questions: this.questionsList,
        });
      }
    });
  }

  getLevel(event: any) {
    this.specialityId = event.target.value;
    this.updateExamService
      .getLevelsModulesBySpeciality(this.specialityId)
      .subscribe(
        (response) => {
          this.levels = [];
          this.modules = [];
          this.specialityLevelModule = response;
          console.log('specialityLevelModule', this.specialityLevelModule);
          for (let i = 0; i < this.specialityLevelModule.length; i++) {
            const index = this.levels.findIndex((object) => {
              return object.id === this.specialityLevelModule[i].level.id;
            });
            if (index == -1) {
              this.levels.push(this.specialityLevelModule[i].level);
            }
          }
          this.levels.sort((a, b) => a.name.localeCompare(b.name));
        },
        (error) => {
          console.log('UpdateExam Component error', error);
        }
      );
  }
  getModule(event: any) {
    this.modules = [];
    this.levelId = event.target.value;
    for (let i = 0; i < this.specialityLevelModule.length; i++) {
      if (
        this.specialityLevelModule[i].module &&
        this.specialityLevelModule[i].level.id == this.levelId
      ) {
        this.modules.push(this.specialityLevelModule[i].module);
      }
    }
    this.getStudents(this.specialityId, this.levelId);
  }
  getStudents(specialityId: string, levelId: string) {
    this.updateExamService
      .getStudentsBySpecialityLevel(specialityId, levelId)
      .subscribe(
        (response) => {
          this.students = response;
        },
        (error) => {
          console.log('UpdateExam Component error', error);
        }
      );
  }
  addQuestion() {
    const qstWithAnswers = this.questionForm.value;
    this.questionsList.push(qstWithAnswers);
    this.updateExamForm.value.questions.push(qstWithAnswers);
    this.questionForm.reset();
    const answersLength = this.getansewrs().length;
    for (let i = 0; i < answersLength - 1; i++) {
      this.getansewrs().controls.pop();
    }
    console.log(this.updateExamForm.value);
  }
  addAnswer() {
    this.getansewrs().push(this.initAnswer());
  }
  initAnswer() {
    return new FormGroup({
      title: this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      isCorrect: this.fb.control('', [Validators.required]),
    });
  }
  initQuestion() {
    return new FormGroup({
      text: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      inputType: this.fb.control('', [Validators.required]),
      point: this.fb.control('', [Validators.required]),
      answers: this.fb.array([this.initAnswer()]),
    });
  }

  get title() {
    return this.updateExamForm.get('title') as FormControl;
  }
  get isPublished() {
    return this.updateExamForm.get('isPublished') as FormControl;
  }
  get module() {
    return this.updateExamForm.get('module') as FormControl;
  }
  get examType() {
    return this.updateExamForm.get('examType') as FormControl;
  }
  get startHour() {
    return this.updateExamForm.get('startHour') as FormControl;
  }
  get endHour() {
    return this.updateExamForm.get('endHour') as FormControl;
  }
  get date() {
    return this.updateExamForm.get('date') as FormControl;
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
    return this.getansewrs().controls[answrIndex].get('title') as FormControl;
  }
  isCorrect(answrIndex: number) {
    return this.getansewrs().controls[answrIndex].get(
      'isCorrect'
    ) as FormControl;
  }
  getansewrs(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }
  setSpecialityModuleLevel(event: any) {
    this.updateExamForm.controls['specialityModuleLevel'].setValue(
      this.initSpecialityModuleLevel(event.target.value)
    );
  }
  initSpecialityModuleLevel(moduleId: string) {
    const index = this.specialityLevelModule.findIndex((object) => {
      return object.level.id === this.levelId && object.module.id === moduleId;
    });
    return this.specialityLevelModule[index].id;
  }
  updateExam(): void {
    if (this.addExamError == 0) {
      this.updateExamForm.value.questions.splice(0, 1);
    }
    const startHour = this.updateExamForm.value.startHour;
    const endHour = this.updateExamForm.value.endHour;
    this.updateExamForm.value.startHour = new Date(
      '2000-01-01' + ' ' + startHour
    );
    this.updateExamForm.value.endHour = new Date('2000-01-01' + ' ' + endHour);
    this.updateExamForm.value.students = this.students;
    this.updateExamService.addExam(this.updateExamForm.value).subscribe(
      (response) => {
        this.levelId = '';
        this.specialityId = '';
        console.log(response);
        this.updateExamForm.reset();
        this.modules = [];
        this.levels = [];
        this.questionsList = [];
        this.addExamError = 0;
        Swal.fire(
          'Updates!',
          'The exam has been updated successfully.',
          'success'
        );
      },
      (error) => {
        this.addExamError++;
        console.log('UpdateExam Component error', error);
      }
    );
  }
  showStudents(url: string) {
    this.updateExamService.redirectToStudentsList(url);
  }
  deleteAnswerItem(index: number) {
    this.getansewrs().controls.splice(index, 1);
    this.questionForm.value.answers.splice(index, 1);
    console.log(this.questionForm.value);
    console.log(index);
  }
  getExamsOfThisDate(event: any) {
    console.log(event.target.value);
    const date = event.target.value;
    this.updateExamService.getExamsOfThisDate(date);
  }
}
