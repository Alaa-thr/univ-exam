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
  specialities: ILevel[] = [];
  nameError: string;
  levelUpdate!: ILevel;
  constructor(private readonly levelService: LevelService) {
    this.addForm = false;
    this.updateForm = false;
    this.nameError = '';
    this.form = new FormGroup({
      'name': new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ])
    })
  }

  ngOnInit(): void {
    this.levelService.getLevel().subscribe(
      (response) =>{
        this.specialities = response.items;
        console.log("this.specialities",this.specialities);
      },
      (error) =>{
        console.log("Level component error", error);
      }
    )
  }

  get name() { 
    return this.form.get('name') as FormControl;
  }
  addLevel(){
    const data = this.form.value;
    this.levelService.addLevel(data).subscribe(
      (response) =>{
        this.form.reset();
        this.specialities.unshift(response)
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
        const speclt = this.specialities.indexOf(this.levelUpdate);
        this.specialities[speclt].name = data.name;
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
        const speclt = this.specialities.indexOf(level);
        this.specialities.splice(speclt,1);
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
