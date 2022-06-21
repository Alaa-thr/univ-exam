import { Component, OnInit } from '@angular/core';
import { IExam, IQuestion, IStudentExam } from '@univ-exam/common';
import Swal from 'sweetalert2';
import { ExamListService } from './exam-list.service';
@Component({
  selector: 'univ-exam-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css'],
})
export class ExamListComponent implements OnInit {

  exams: IExam[] = [];
  currentPage: number; 
  totalPages: number;
  itemsLimit: number;
  questions: IQuestion[] = [];
  studentsExam: IStudentExam[] = [];
  examId: string;
  todayDateTime= {
    time: '',
    date: ''
  };
  constructor(
    private readonly examListService: ExamListService) {
    this.currentPage = 0;
    this.totalPages = 0;
    this.itemsLimit = 10;
    this.examId = '';
  }

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(){
    const query = {page: this.currentPage, limit: this.itemsLimit}
    this.examListService.getExams(query).subscribe(
      (response) => {
        this.exams = response.items;
        console.log(this.exams)
      },
      (error) => {
        console.log("ExamListComponent error ", error);
      }
    )
  }
  getQuestions(index: number){
    this.questions = this.exams[index].questions;
  }
  changePage(page: number){
    if(page < 0) return;
    this.currentPage = page;
    this.fetchItems();
  }
  deleteExam(exam: IExam){
    this.examListService.deleteExam(exam.id).subscribe(
      (response) =>{
        Swal.fire(
          'Deleted!',
          'The exam has been deleted.',
          'success'
        );
        const index = this.exams.indexOf(exam);
        this.exams.splice(index,1);
      },
      (error) =>{
        Swal.fire(
          'Error!',
          'The exam didnt deleted.',
          'error'
        );
      }
    )
  }
  deleteAlert(exam: IExam){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteExam(exam);
      }
    });
  }
  getStudentsOfThisExam(examId:string) {
    this.examId = examId;
    this.examListService.getStudents(examId).subscribe(
      (response) => {
        this.studentsExam = response;
        this.getExamStertedTimeByStudent();
      },
      (error) => {
        console.log("ExamListComponent error ", error);
      }
    )
  }
  showStudents(url:string) {
    window.open("http://localhost:4201/"+url, '_blank');
  }
  private getExamStertedTimeByStudent() {
    this.examListService.startExam().then(
      (response) => {
        this.todayDateTime = response;
      },
      (error) => {
        console.log('ExamListComponent Component error', error);
      }
    );
  }
  startNow(): boolean{
    const todayTime = this.todayDateTime.time;
    const todayDate = this.todayDateTime.date;
    const date = new Date(todayDate+' '+todayTime);
    const examById: any  = this.exams.find((object) => {
      return object.id === this.examId
    });
    const examEndDate = new Date(examById.date+' '+examById.endHour);
    if(examEndDate < date){
      return true;
    }else{
      return false;
    }
  }
  publishExam(examIndex: number){
    const examId = this.exams[examIndex].id;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, publish it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.examListService.publishExam(examId).subscribe(
          (response) =>{
            Swal.fire(
              'Published!',
              'The exam has been published.',
              'success'
            );
            this.exams[examIndex].isPublished = true;
          },
          (error)=>{
            console.log('ExamListComponent Component error', error);
            Swal.fire(
              'Error!',
              'The exam didnt published.',
              'error'
            );
          }
        )
      }
    });
  }

}
