import { Component, OnInit } from '@angular/core';
import { IExam, IQuestion } from '@univ-exam/common';
import Swal from 'sweetalert2';
import { ExamListService } from './student-exam-list.service';

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
  constructor(private readonly examListService: ExamListService) {
    this.currentPage = 0;
    this.totalPages = 0;
    this.itemsLimit = 10;
  }

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(){
    const query = {page: this.currentPage, limit: this.itemsLimit}
    this.examListService.getExams(query).subscribe(
      (response) => {
        this.exams = response.items;
        console.log(response)
      },
      (error) => {
        console.log("ExamListComponent error ", error);
      }
    )
  }
  getQuestions(index: number){
    this.questions = this.exams[index].questions;
    console.log(this.questions)
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
          'The level didnt deleted.',
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
}
