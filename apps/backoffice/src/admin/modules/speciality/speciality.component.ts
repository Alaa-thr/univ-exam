import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILevel, ISpeciality } from '@univ-exam/common';
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
  levels: ILevel[] = [];
  constructor(private readonly specialityService: SpecialityService) {
    this.addForm = false;
    this.updateForm = false;
    this.nameError = '';
    this.form = new FormGroup({
      'name': new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ]),
      'levels': new FormControl('',[
        Validators.required,
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
        console.log("spaciality",this.specialities)
        this.totalPages = response.totalPages;
      },
      (error) =>{
        console.log("Speciality component error", error);
      }
    );
    this.specialityService.getLevel().subscribe(
      (response) =>{
        this.levels = response.items;
        console.log("levels",this.levels)
      },
      (error) =>{
        console.log("Speciality component error", error);
      }
    );
  }
  getLevelsListOfSpecialities(specialityId: string){
    const specialityModuleLevels: ILevel[] = [];
    for(let i = 0; i< this.specialities.length; i++){
      if(this.specialities[i].id === specialityId){
        for(let j = 0; j< this.specialities[i].specialityModuleLevels.length; j++){
          const index = specialityModuleLevels.find((object) => {
            return object.id === this.specialities[i].specialityModuleLevels[j].level.id});
          if(!index){
            specialityModuleLevels.push(this.specialities[i].specialityModuleLevels[j].level)
          }
        }
      }
    }
    specialityModuleLevels.sort((a, b) => a.name.localeCompare(b.name))
    return specialityModuleLevels;
  }
  changePage(page: number){
    if(page < 0) return;
    this.currentPage = page;
    this.fetchItems();
  }
  get name() { 
    return this.form.get('name') as FormControl;
  }
  get level() { 
    return this.form.get('levels') as FormControl;
  }
  addSpeciality(){
    const data = this.form.value;
    this.specialityService.addSpeciality(data).subscribe(
      (response) =>{
        this.form.reset();
        this.specialities.unshift(response);
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
    this.form.setValue({name: speciality.name, levels: []});
  }
  openForm(){
    this.updateForm = false;
    this.addForm = true;
    this.form.reset();
  }
  updateSpeciality(){
    const data = this.form.value;
    this.specialityService.updateSpeciality(this.specialityUpdate.id,data).subscribe(
      (response) =>{
        const speclt = this.specialities.indexOf(this.specialityUpdate);
        this.specialities.splice(speclt, 1,response);
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
