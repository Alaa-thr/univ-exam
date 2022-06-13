import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILevel, ISpeciality } from '@univ-exam/common';
import Swal from 'sweetalert2';
import { CreateStudentService } from './create-student.service';

@Component({
  selector: 'univ-exam-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css'],
})
export class CreateStudentComponent implements OnInit {

  form: FormGroup;
  specialities: ISpeciality[] = [];
  levels: ILevel[] = [];
  error: string;
  constructor(private readonly createStudentService: CreateStudentService) {
    this.error = '';
    this.form = new FormGroup({
      'email': new FormControl('',[
        Validators.required,
        Validators.email,
      ]),
      'password': new FormControl('',[
        Validators.required,
        Validators.pattern(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/),
      ]),
      'student': new FormGroup({
        'firstName': new FormControl('',[
          Validators.required,
          Validators.minLength(3),
        ]),
        
        'lastName': new FormControl('',[
          Validators.required,
          Validators.minLength(3),
        ]),
        'birthDate': new FormControl('',[
          Validators.required
        ]),
        'phoneNumber': new FormControl('',[
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10)
        ]),
        'studentNumber': new FormControl('',[
          Validators.required,
          Validators.minLength(12),
        ]),
        'speciality': new FormControl('',[
          Validators.required
        ]),
        'level': new FormControl('',[
          Validators.required
        ])
      })
    });
  }

  ngOnInit(): void {
    this.createStudentService.getSpeciality().subscribe(
      (response)=>{
        this.specialities = response.items;
        console.log("specialities", response)
      },
      (error)=>{
        console.log("CreateStudent component error", error);
      }
    )
  }
  createStudent(){
    this.createStudentService.addStudent(this.form.value).subscribe(
      (response) => {
        console.log(response)
        this.form.reset();
        Swal.fire(
          'Success!',
          'The student has bean created successfully',
          'success'
        );

      },
      (error) => {
        console.log('CreateStudent Component error', error);
        this.error = error.error.message;
      }
    )
  }
  getLevel(event: any){
    const specialityId = event.target.value;
    this.createStudentService.getLevelsBySpeciality(specialityId).subscribe(
      (response) => {
        this.levels = [];
        const specialityLevel = response;
        for(let i=0; i< specialityLevel.length; i++){
          const index = this.levels.findIndex(object => {
            return object.id === specialityLevel[i].level.id;
          });
          if(index == -1){
            this.levels.push(specialityLevel[i].level)
          }
        }
        this.levels.sort((a, b) => a.name.localeCompare(b.name))
      },(error)=>{
        console.log('CreateStudent Component error', error);
      }
    );
  }

  get students() { 
    return this.form.get('student') as FormGroup;
  }
  get firstName() { 
    return this.students.get('firstName') as FormControl;
  }
  get lastName() { 
    return this.students.get('lastName') as FormControl;
  }
  get birthDate() { 
    return this.students.get('birthDate') as FormControl;
  }
  get phoneNumber() { 
    return this.students.get('phoneNumber') as FormControl;
  }
  get studentNumber() { 
    return this.students.get('studentNumber') as FormControl;
  }
  get speciality() { 
    return this.students.get('speciality') as FormControl;
  }
  get level() { 
    return this.students.get('level') as FormControl;
  }
  get email() { 
    return this.form.get('email') as FormControl;
  }
  get password() { 
    return this.form.get('password') as FormControl;
  }
}
