import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IStudent } from '@univ-exam/common';
import { StudentService } from './student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'univ-exam-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  

  students: IStudent[] = [];
  currentPage: number; 
  totalPages: number;
  itemsLimit: number;
  constructor(private readonly studentService: StudentService) {
    this.currentPage = 0;
    this.totalPages = 0;
    this.itemsLimit = 10;
  }

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(){
    const query = {page: this.currentPage, limit: this.itemsLimit}
    this.studentService.getStudents(query).subscribe(
      (response) =>{
        this.students = response.items;
        this.totalPages = response.totalPages;
        console.log("students", this.students)
      },
      (error) =>{
        console.log("Student component error", error);
      }
    )
  }
  changePage(page: number){
    if(page < 0) return;
    this.currentPage = page;
    this.fetchItems();
  }

  // get name() { 
  //   return this.form.get('name') as FormControl;
  // }
  // addStudent(){
  //   const data = this.form.value;
  //   this.studentService.addStudent(data).subscribe(
  //     (response) =>{
  //       this.form.reset();
  //       this.students.unshift(response)
  //     },
  //     (error) =>{
  //       this.nameError = error.error.message[0];
  //     }
  //   )
  // }
  // done(){
  //   this.addForm = false;
  //   this.updateForm = false;
  //   this.form.reset();
  //   this.nameError = '';
  // }
  // editStudent(student: IStudent){
  //   this.addForm = true;
  //   this.updateForm = true;
  //   this.studentUpdate = student;
  //   this.form.setValue({name: student.name});
  // }
  // updateStudent(){
  //   const data = this.form.value;
  //   this.studentService.updateStudent(this.studentUpdate.id,data).subscribe(
  //     (response) =>{
  //       const speclt = this.students.indexOf(this.studentUpdate);
  //       this.students[speclt].name = data.name;
  //     },
  //     (error) =>{
  //       this.nameError = error.error.message[0];
  //     }
  //   )
  // }
  // deleteStudent(student: IStudent){
  //   this.studentService.deleteStudent(student.id).subscribe(
  //     (response) =>{
  //       Swal.fire(
  //         'Deleted!',
  //         'The student has been deleted.',
  //         'success'
  //       );
  //       const speclt = this.students.indexOf(student);
  //       this.students.splice(speclt,1);
  //     },
  //     (error) =>{
  //       Swal.fire(
  //         'Error!',
  //         'The student didnt deleted.',
  //         'error'
  //       );
  //     }
  //   )
  // }

  // deleteAlert(student: IStudent){
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.deleteStudent(student);
  //     }
  //   });
  // }
}
