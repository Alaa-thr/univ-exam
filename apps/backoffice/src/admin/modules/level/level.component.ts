import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILevel } from '@univ-exam/common';
import { LevelService } from './level.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'univ-exam-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css'],
})
export class LevelComponent implements OnInit {
  
  addForm: boolean;
  updateForm: boolean;
  form: FormGroup;
  levels: ILevel[] = [];
  nameError: string;
  levelUpdate!: ILevel;
  currentPage: number; 
  totalPages: number;
  itemsLimit: number;
  constructor(private readonly levelService: LevelService) {
    this.addForm = false;
    this.updateForm = false;
    this.nameError = '';
    this.form = new FormGroup({
      'name': new FormControl('',[
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
    this.levelService.getLevel(query).subscribe(
      (response) =>{
        this.levels = response.items;
        this.totalPages = response.totalPages;
        console.log("response",response);
        console.log("this.totalPage",this.totalPages);
      },
      (error) =>{
        console.log("Speciality component error", error);
      }
    )
  }
  changePage(page: number){
    if(page < 0) return;
    this.currentPage = page;
    this.fetchItems();
  }

  get name() { 
    return this.form.get('name') as FormControl;
  }
  addLevel(){
    const data = this.form.value;
    this.levelService.addLevel(data).subscribe(
      (response) =>{
        this.form.reset();
        this.levels.unshift(response)
      },
      (error) =>{
        this.nameError = error.error.message[0];
      }
    )
  }
  done(){
    this.addForm = false;
    this.updateForm = false;
    this.form.reset();
    this.nameError = '';
  }
  editLevel(level: ILevel){
    this.addForm = true;
    this.updateForm = true;
    this.levelUpdate = level;
    this.form.setValue({name: level.name});
  }
  updateLevel(){
    const data = this.form.value;
    this.levelService.updateLevel(this.levelUpdate.id,data).subscribe(
      (response) =>{
        const speclt = this.levels.indexOf(this.levelUpdate);
        this.levels[speclt].name = data.name;
      },
      (error) =>{
        this.nameError = error.error.message[0];
      }
    )
  }
  deleteLevel(level: ILevel){
    this.levelService.deleteLevel(level.id).subscribe(
      (response) =>{
        Swal.fire(
          'Deleted!',
          'The level has been deleted.',
          'success'
        );
        const speclt = this.levels.indexOf(level);
        this.levels.splice(speclt,1);
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

  deleteAlert(level: ILevel){
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
