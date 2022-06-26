import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, HostListener, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { calculeTime } from '../../shared/functions/commonFunction';
import { RecordVideoComponent } from '../record-video/record-video.component';
import { TakeExamService } from './take-exam.service';

@Component({
  selector: 'univ-exam-take-exam',
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.css'],
})
export class TakeExamComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('fullScreen', { static: false }) fullScreenDivRef: any;
  @ViewChild('recordVideo') recordVideo!: RecordVideoComponent;

  examDetails: any;
  leftTime: number;
  multiStepScript: any;
  form: FormGroup;
  selectedOption: boolean;
  oneAnswerSelectedAtLeast: boolean;
  elem: any;
  configCountDown: any;
  timeDone: number;
  videoRecorded: any;
  file!: File;
  exitFullScreen = 0;
  examStarts = false;
  enterToBeforeUnload = false;
  redirect = false;
  @HostListener('window:beforeunload', ['$event'])   
  beforeUnLoadPage(event:any) { 
    if(this.examStarts && !this.redirect){
      event.returnValue = "" ;
    }
  }
  @HostListener('window:unload', ['$event'])
  unLoadPage() {
    if(this.examStarts){
      this.enterToBeforeUnload = true;
      this.setCheaterStudent();
      this.sleep(1000)
    }
  }
  @HostListener('window:blur', ['$event'])
  visibilityChange() {
    this.onVisibilityChange();
    if(this.examStarts && !this.enterToBeforeUnload){
      this.onVisibilityChange();
    }
  }
  
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
    this.configCountDown = { leftTime: this.leftTime, notify: [3000], demand: true };
    this.timeDone = 0;
    this.form = this.fb.group({
      'questions': this.fb.array([
        this.fb.group({
          'qst': this.fb.control(''),
          'ansewrs': this.fb.array([
            this.fb.control('')
          ], Validators.minLength(2))
        })
      ]),
      'video': this.fb.control('')
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        const examId = params['id'];
        this.takeExamService.getScheduledExamById(examId).subscribe(
          (response) => {
            if(response.studentExams[0].grade === -2) this.goTakenExams();
            this.examDetails = response;
          }, (error) => {
            console.log('ExamDetails Component error', error);
          }
        );
      }
    );
  }
  getFullScreenElemet(){
    return this.document.fullscreenElement
    || this.document.webkitFullscreenElement
    || this.document.mozFullscreenElement
    || this.document.msFullscreenElement
  }
  onVisibilityChange() {
    this.closeFullscreen();
  }
  ngAfterViewInit(): void {
    this.startExamAlert();
    this.initStepsScript();
    this.document.addEventListener('fullscreenchange', (event:any) => {
      if(!this.getFullScreenElemet()){
        this.fullscreenchanged();
      }
    });
  }
  ngOnDestroy(): void {
    document.body.removeChild(this.multiStepScript);
    window.removeEventListener("beforeunload",()=>{});
    window.removeEventListener("unload",()=>{});
    window.removeEventListener("visibilitychange",()=>{});
  }
  setRadioValue(selected: any, questionId: string): void {
    this.selectedOption = true;
    this.addAnswerToQuestion(selected, questionId);
  }
  addAnswerToQuestion(answerId: string, questionId: string): void {
    const allQuestions = this.questions.value;
    const questionIndex = allQuestions.findIndex((obj: { qst: string; }) => obj.qst === questionId);
    const newElement = {
      qst: questionId,
      answers: [answerId]
    };
    if (questionIndex === -1) {
      allQuestions.push(newElement);
    } else {
      const allAnswersOfQuestion = allQuestions[questionIndex].answers;
      const answerIndex = allAnswersOfQuestion.findIndex((obj: string) => obj === answerId);
      if (this.selectedOption == true) { // case of the answer is in radio
        allAnswersOfQuestion.splice(0, allAnswersOfQuestion.length);
        allAnswersOfQuestion.push(answerId);

      } else { //case of the answer is in the checkbox
        if (answerIndex === -1) {
          allAnswersOfQuestion.push(answerId);
        } else {
          allAnswersOfQuestion.splice(answerIndex, 1);
        }
      }
      if (allAnswersOfQuestion.length == 0) { // the case of allAnswersOfQuestion array is empty
        allQuestions.splice(questionIndex, 1);
      }
    }
    this.selectedOption = false;
    this.setOneAnswerSelectedAtLeast(questionId);
  }
  onSubmit() {
    const answers = this.form.value;
    for (let i = 0; i < answers.questions.length; i++) {
      if (answers.questions[i].qst == '') {
        answers.questions.splice(i, 1);
      }
    }
    const formData = new FormData();
    formData.append("video", answers.video)
    formData.append("questions", JSON.stringify(answers.questions));
    this.takeExamService.addStudentAnswers(formData).subscribe(
      (respone) => {
        this.closeFullscreen();
        this.examStarts = false;
        this.enterToBeforeUnload = true;
        Swal.fire({
          title: 'Congratulations!',
          icon: 'success',
          text: "Your answers have been submitted successfully",
          confirmButtonText: 'Back Home',
          confirmButtonColor: '#3085d6'
        }).then((result) => {
          this.goTakenExams();
        })
      },
      (error) => {
        console.log('ExamDetails Component error', error);
      }
    );
  }
  stopRecord() {
    this.recordVideo.stopRecording();
  }
  getTimeLeft(startHour: string, endHour: string): number {
    const min = calculeTime(startHour, endHour);
    const sec = min * 60;
    return sec;
  }
  handleCountDown(event: any) {
    if (event.action == "done" && this.timeDone) {
      setTimeout(() => {
        this.recordVideo.stopRecording();
        this.closeFullscreen();
        Swal.fire({
          title: 'Time is Done',
          text: "Your answers have been submitted successfully ",
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Back Home'
        }).then((result) => {
          this.goTakenExams();
        })
      }, 1000)
    }
    this.timeDone++;
  }
  setOneAnswerSelectedAtLeast(questionId: string): void {
    const allQuestions = this.questions.value;
    const questionIndex = allQuestions.findIndex((obj: { qst: string; }) => obj.qst === questionId);
    if (questionIndex === -1) {
      this.oneAnswerSelectedAtLeast = true;
    } else {
      this.oneAnswerSelectedAtLeast = false;
    }
  }
  getVideoRecordingRequest(event: any) {
    this.videoRecorded = event.videoRecorded;
    const videoName = this.examDetails.id + '_' + this.examDetails.studentExams[0].student.id + '.webm'
    const answers = this.form.value;
    const file = new File([this.videoRecorded], videoName, { type: 'video/webm' });
    answers.video = file;
    if(!this.redirect)this.onSubmit();
    else this.setCheaterStudent();
  }
  private initStepsScript(): void {
    this.elem = this.fullScreenDivRef.nativeElement;
    this.multiStepScript = document.createElement("script");
    this.multiStepScript.type = "text/javascript";
    this.multiStepScript.src = "assets/js/bootstrap-multi-step-form.js";
    document.body.appendChild(this.multiStepScript);
  }
  private startExamAlert() {
    Swal.fire({
      title: 'Get Started',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Start'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.getExamStertedTimeByStudent();

      } else {
        this.goHome();
      }
    });
  }
  private get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }
  private goHome(): void {
    const link = "exam/scheduled-exams";
    location.href = link;
  }
  private goTakenExams(): void {
    const link = "exam/taken-exams";
    location.href = link;
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
    this.configCountDown = { leftTime: this.leftTime, notify: [3000], demand: false };
  }
  private closeFullscreen(): void {
    if (document.fullscreen) {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        this.document.msExitFullscreen();
      }
    }
  }
  private getExamStertedTimeByStudent(): string {
    let startExamTime = "";
    this.takeExamService.startExam().then(
      (response) => {
        startExamTime = response.startedExam;
        this.setTimeLeftAndStartExam(startExamTime);
      },
      (error) => {
        console.log('ExamDetails Component error', error);
      }
    );
    return startExamTime;
  }
  private setTimeLeftAndStartExam(startExamTime: string) {
    this.leftTime = this.getTimeLeft(this.examDetails.startHour, this.examDetails.endHour);
    const timeFromStudentStart = this.getTimeLeft(this.examDetails.startHour, startExamTime);
    this.leftTime = this.leftTime - timeFromStudentStart;
    if (this.leftTime < 0) {
      this.goHome();
    } else {
      this.examStarts = true;
      this.recordVideo.startRecording();
      this.openFullscreen();
    }
  }

  fullscreenchanged() {
      this.timerAlert(); 
  }
  sleep(delay:any) {
    const start = new Date().getTime();
    while (new Date().getTime() < start + delay);
  }
  timerAlert(){
    let timerInterval: any;
    if(!this.enterToBeforeUnload){
      Swal.fire({
        title: 'Go back to fullScreen!',
        html: 'in <b></b> seconds, or you will be considered as a <strong>cheater</strong>.',
        timer: 10000,
        timerProgressBar: true,
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Go back',
        allowOutsideClick: false,
        didOpen: () => {
          timerInterval = setInterval(() => {
            const b = Swal.getHtmlContainer()?.querySelector('b');
            if(b){
              const val = Swal.getTimerLeft();
              if(val) b.textContent = (val/1000).toFixed().toString();
            }
          }, 1000)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.openFullscreen();
        }
        if (result.dismiss === Swal.DismissReason.timer) {
          this.redirect = true;
          this.recordVideo.stopRecording();
          
        }
      })
    }
  }
  setCheaterStudent(){
    const answers = this.form.value;
    const formData = new FormData();
    formData.append("video", answers.video);
    formData.append("studentExams", JSON.stringify(this.examDetails.studentExams[0]));
    this.takeExamService.setCheaterStudent(formData).subscribe(
      (response) =>{
        this.goTakenExams();
      },
      (error) => {

      }
    );
  }
}
