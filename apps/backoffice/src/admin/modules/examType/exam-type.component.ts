import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IExamType } from '@univ-exam/common';
import Swal from 'sweetalert2';
import { ExamTypeService } from './exam-type.service';

@Component({
  selector: 'univ-exam-exam-type',
  templateUrl: './exam-type.component.html',
  styleUrls: ['./exam-type.component.css'],
})
export class ExamTypeComponent implements OnInit {
  addForm: boolean;
  updateForm: boolean;
  form: FormGroup;
  examTypes: IExamType[] = [];
  typeError: string;
  levelUpdate!: IExamType;
  currentPage: number; 
  totalPages: number;
  itemsLimit: number;
  constructor(private readonly examTypeService: ExamTypeService) {
    this.addForm = false;
    this.updateForm = false;
    this.typeError = '';
    this.form = new FormGroup({
      'type': new FormControl('',[
        Validators.required,
        Validators.minLength(2)
      ])
    });
    this.currentPage = 0;
    this.totalPages = 0;
    this.itemsLimit = 10;
  }

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(){
    const query = {page: this.currentPage, limit: this.itemsLimit}
    this.examTypeService.getExamType(query).subscribe(
      (response) =>{
        this.examTypes = response.items;
        this.totalPages = response.totalPages;
      },
      (error) =>{
        console.log("Level component error", error);
      }
    )
  }
  changePage(page: number){
    if(page < 0) return;
    this.currentPage = page;
    this.fetchItems();
  }

  get type() { 
    return this.form.get('type') as FormControl;
  }
  addLevel(){
    const data = this.form.value;
    this.examTypeService.addLevel(data).subscribe(
      (response) =>{
        this.form.reset();
        this.examTypes.unshift(response)
      },
      (error) =>{
        this.typeError = error.error.message[0];
      }
    )
  }
  done(){
    this.addForm = false;
    this.updateForm = false;
    this.form.reset();
    this.typeError = '';
  }
  editLevel(level: IExamType){
    this.addForm = true;
    this.updateForm = true;
    this.levelUpdate = level;
    this.form.setValue({type: level.type});
  }
  updateLevel(){
    const data = this.form.value;
    this.examTypeService.updateLevel(this.levelUpdate.id,data).subscribe(
      (response) =>{
        const speclt = this.examTypes.indexOf(this.levelUpdate);
        this.examTypes[speclt].type = data.type;
      },
      (error) =>{
        this.typeError = error.error.message[0];
      }
    )
  }
  deleteLevel(level: IExamType){
    this.examTypeService.deleteLevel(level.id).subscribe(
      (response) =>{
        Swal.fire(
          'Deleted!',
          'The level has been deleted.',
          'success'
        );
        const speclt = this.examTypes.indexOf(level);
        this.examTypes.splice(speclt,1);
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

  deleteAlert(level: IExamType){
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
        this.deleteLevel(level);
      }
    });
  }
}
