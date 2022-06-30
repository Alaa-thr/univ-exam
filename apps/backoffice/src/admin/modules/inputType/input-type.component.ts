import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IInputType } from '@univ-exam/common';
import Swal from 'sweetalert2';
import { InputTypeService } from './input-type.service';

@Component({
  selector: 'univ-exam-input-type',
  templateUrl: './input-type.component.html',
  styleUrls: ['./input-type.component.css'],
})
export class InputTypeComponent implements OnInit {
  addForm: boolean;
  updateForm: boolean;
  form: FormGroup;
  inputTypes: IInputType[] = [];
  typeError: string;
  inputTypeUpdate!: IInputType;
  currentPage: number; 
  totalPages: number;
  itemsLimit: number;
  constructor(private readonly inputTypeService: InputTypeService) {
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
    this.inputTypeService.getInputType(query).subscribe(
      (response) =>{
        this.inputTypes = response.items;
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
    this.inputTypeService.addInputType(data).subscribe(
      (response) =>{
        this.form.reset();
        this.inputTypes.unshift(response)
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
  editLevel(level: IInputType){
    this.addForm = true;
    this.updateForm = true;
    this.inputTypeUpdate = level;
    this.form.setValue({type: level.type});
  }
  updateLevel(){
    const data = this.form.value;
    this.inputTypeService.updateInputType(this.inputTypeUpdate.id,data).subscribe(
      (response) =>{
        const speclt = this.inputTypes.indexOf(this.inputTypeUpdate);
        this.inputTypes[speclt].type = data.type;
      },
      (error) =>{
        this.typeError = error.error.message[0];
      }
    )
  }
  deleteLevel(level: IInputType){
    this.inputTypeService.deleteInputType(level.id).subscribe(
      (response) =>{
        Swal.fire(
          'Deleted!',
          'The level has been deleted.',
          'success'
        );
        const speclt = this.inputTypes.indexOf(level);
        this.inputTypes.splice(speclt,1);
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

  deleteAlert(level: IInputType){
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
