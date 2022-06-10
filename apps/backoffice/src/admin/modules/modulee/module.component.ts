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
  updateForm: boolean;
  form: FormGroup;
  modules: IModule[] = [];
  nameError: string;
  moduleUpdate!: IModule;
  levels: ILevel[] = [];
  specialities: ISpeciality[] = [];
  constructor(private readonly moduleService: ModuleService) {
    this.addForm = false;
    this.updateForm = false;
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
    })
  }

  ngOnInit(): void {
    this.moduleService.getModule().subscribe(
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
    )
  }

  getLevel(event: any){
    const specialityId = event.target.value;
    console.log("form", this.form)
    this.moduleService.getLevels().subscribe(
      (response) =>{
        this.levels = response.items;
        console.log("this.levels",this.levels);
      },
      (error) =>{
        console.log("Module component error", error);
      }
    )
    //get levels of speciality 
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
    this.moduleService.addModule(data).subscribe(
      (response) =>{
        this.form.reset();
        this.modules.unshift(response)
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
  editModule(module: IModule){
    this.addForm = true;
    this.updateForm = true;
    this.moduleUpdate = module;
    this.form.setValue({name: module.name});
  }
  updateModule(){
    const data = this.form.value;
    this.moduleService.updateModule(this.moduleUpdate.id,data).subscribe(
      (response) =>{
        const speclt = this.modules.indexOf(this.moduleUpdate);
        this.modules[speclt].name = data.name;
      },
      (error) =>{
        this.nameError = error.error.message[0];
      }
    )
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
