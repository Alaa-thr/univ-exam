import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITeacher } from '@univ-exam/common';
import { TeacherService } from './teacher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'univ-exam-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
})
export class TeacherComponent implements OnInit {
  teachers: ITeacher[] = [];
  currentPage: number;
  totalPages: number;
  itemsLimit: number;
  constructor(private readonly teacherService: TeacherService) {
    this.currentPage = 0;
    this.totalPages = 0;
    this.itemsLimit = 10;
  }

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems() {
    const query = { page: this.currentPage, limit: this.itemsLimit };
    this.teacherService.getTeachers(query).subscribe(
      (response) => {
        this.teachers = response.items;
        this.totalPages = response.totalPages;
        console.log('teachers', this.teachers);
      },
      (error) => {
        console.log('Teacher component error', error);
      }
    );
  }
  changePage(page: number) {
    if (page < 0) return;
    this.currentPage = page;
    this.fetchItems();
  }

  // get name() {
  //   return this.form.get('name') as FormControl;
  // }
  // addTeacher(){
  //   const data = this.form.value;
  //   this.teacherService.addTeacher(data).subscribe(
  //     (response) =>{
  //       this.form.reset();
  //       this.teachers.unshift(response)
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
  // editTeacher(teacher: ITeacher){
  //   this.addForm = true;
  //   this.updateForm = true;
  //   this.teacherUpdate = teacher;
  //   this.form.setValue({name: teacher.name});
  // }
  // updateTeacher(){
  //   const data = this.form.value;
  //   this.teacherService.updateTeacher(this.teacherUpdate.id,data).subscribe(
  //     (response) =>{
  //       const speclt = this.teachers.indexOf(this.teacherUpdate);
  //       this.teachers[speclt].name = data.name;
  //     },
  //     (error) =>{
  //       this.nameError = error.error.message[0];
  //     }
  //   )
  // }
  deleteTeacher(teacher: ITeacher) {
    this.teacherService.deleteTeacher(teacher.id).subscribe(
      (response) => {
        Swal.fire('Deleted!', 'The teacher has been deleted.', 'success');
        const speclt = this.teachers.indexOf(teacher);
        this.teachers.splice(speclt, 1);
      },
      (error) => {
        Swal.fire('Error!', 'The teacher didnt deleted.', 'error');
      }
    );
  }

  deleteAlert(teacher: ITeacher) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteTeacher(teacher);
      }
    });
  }
}
