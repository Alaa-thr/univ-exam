import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ILevel, IModule, ISpeciality } from '@univ-exam/common';
import Swal from 'sweetalert2';
import { ModuleService } from './module.service';

@Component({
  selector: 'univ-exam-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css'],
})
export class ModuleComponent implements OnInit {
  
  addForm: boolean;
  form: FormGroup;
  modules: IModule[] = [];
  nameError: string;
  levels: ILevel[] = [];
  specialities: ISpeciality[] = [];
  currentPage: number; 
  totalPages: number;
  itemsLimit: number;
  constructor(private readonly moduleService: ModuleService) {
    this.addForm = false;
    this.nameError = '';
    this.form = new FormGroup({
      'name': new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ]),
      'speciality': new FormControl('',[
        Validators.required
      ]),
      'level': new FormControl('',[
        Validators.required
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
    this.moduleService.getModule(query).subscribe(
      (response) =>{
        this.modules = response.items;
        console.log("this.modules",this.modules);
      },
      (error) =>{
        console.log("Module component error", error);
      }
    );
    this.moduleService.getSpecialities().subscribe(
      (response) =>{
        this.specialities = response.items;
        console.log("this.specialities",this.specialities);
      },
      (error) =>{
        console.log("Module component error", error);
      }
    );
  }
  changePage(page: number){
    if(page < 0) return;
    this.currentPage = page;
    this.fetchItems();
  }

  getLevel(event: any){
    this.levels = [];
    const specialityId = event.target.value;
    for(let i=0; i < this.specialities.length; i++){
      if(this.specialities[i].id == specialityId){
        for(let j=0; j<this.specialities[i].specialityModuleLevels.length; j++ ){
          this.levels.push(this.specialities[i].specialityModuleLevels[j].level)
        }
      }
    }
    this.levels.sort((a, b) => a.name.localeCompare(b.name))
  }

  get name() { 
    return this.form.get('name') as FormControl;
  }
  get speciality() { 
    return this.form.get('speciality') as FormControl;
  }
  get level() { 
    return this.form.get('level') as FormControl;
  }
  addModule(){
    
    const data = this.form.value;
    for(let i=0; i < this.specialities.length; i++){
      if(this.specialities[i].id == data.speciality){
        data.speciality = this.specialities[i];
      }
    }
    for(let i=0; i < this.levels.length; i++){
      if(this.levels[i].id == data.level){
        data.level = this.levels[i];
      }
    }
    console.log(data);
    this.moduleService.addModule(data).subscribe(
      (response) =>{
        this.form.reset();
        console.log();
        const index = this.modules.indexOf(response);
        this.modules.splice(index,1)
        this.modules.unshift(response)
      },
      (error) =>{
        this.nameError = error.error.message[0];
      }
    )
  }
  done(){
    this.addForm = false;
    this.form.reset();
    this.nameError = '';
  }
  deleteModule(module: IModule){
    this.moduleService.deleteModule(module.id).subscribe(
      (response) =>{
        Swal.fire(
          'Deleted!',
          'The module has been deleted.',
          'success'
        );
        const speclt = this.modules.indexOf(module);
        this.modules.splice(speclt,1);
      },
      (error) =>{
        Swal.fire(
          'Error!',
          'The module didnt deleted.',
          'error'
        );
      }
    )
  }

  deleteAlert(module: IModule){
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
        this.deleteModule(module);
      }
    });
  }
}
