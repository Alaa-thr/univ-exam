import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISpeciality } from '@univ-exam/common';
import { SpecialityService } from './speciality.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'univ-exam-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.css'],
})
export class SpecialityComponent implements OnInit {
  
  addForm: boolean;
  updateForm: boolean;
  form: FormGroup;
  specialities: ISpeciality[] = [];
  nameError: string;
  specialityUpdate!: ISpeciality;
  currentPage: number; 
  totalPages: number;
  itemsLimit: number;
  constructor(private readonly specialityService: SpecialityService) {
    this.addForm = false;
    this.updateForm = false;
    this.nameError = '';
    this.form = new FormGroup({
      'name': new FormControl('',[
        Validators.required,
        Validators.minLength(3)
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
    this.specialityService.getSpeciality(query).subscribe(
      (response) =>{
        this.specialities = response.items;
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
  addSpeciality(){
    const data = this.form.value;
    this.specialityService.addSpeciality(data).subscribe(
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
  editSpeciality(speciality: ISpeciality){
    this.addForm = true;
    this.updateForm = true;
    this.specialityUpdate = speciality;
    this.form.setValue({name: speciality.name});
  }
  updateSpeciality(){
    const data = this.form.value;
    this.specialityService.updateSpeciality(this.specialityUpdate.id,data).subscribe(
      (response) =>{
        const speclt = this.specialities.indexOf(this.specialityUpdate);
        this.specialities[speclt].name = data.name;
      },
      (error) =>{
        this.nameError = error.error.message[0];
      }
    )
  }
  deleteSpeciality(speciality: ISpeciality){
    this.specialityService.deleteSpeciality(speciality.id).subscribe(
      (response) =>{
        Swal.fire(
          'Deleted!',
          'The speciality has been deleted.',
          'success'
        );
        const speclt = this.specialities.indexOf(speciality);
        this.specialities.splice(speclt,1);
      },
      (error) =>{
        Swal.fire(
          'Error!',
          'The speciality didnt deleted.',
          'error'
        );
      }
    )
  }

  deleteAlert(speciality: ISpeciality){
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
        this.deleteSpeciality(speciality);
      }
    });
  }
}
