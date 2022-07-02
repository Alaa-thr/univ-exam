import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILevel, ISpeciality } from '@univ-exam/common';
import Swal from 'sweetalert2';
import { CreateTeacherService } from './create-teacher.service';

@Component({
  selector: 'univ-exam-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.css'],
})
export class CreateTeacherComponent implements OnInit {
  form: FormGroup;

  error: string;
  constructor(private readonly createTeacherService: CreateTeacherService) {
    this.error = '';
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
        ),
      ]),
      teacher: new FormGroup({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),

        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        birthDate: new FormControl('', [Validators.required]),
        phoneNumber: new FormControl('', [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ]),
      }),
    });
  }

  ngOnInit(): void {}
  createTeacher() {
    this.createTeacherService.addTeacher(this.form.value).subscribe(
      (response) => {
        console.log(response);
        this.form.reset();
        Swal.fire(
          'Success!',
          'The teacher has been created successfully',
          'success'
        );
      },
      (error) => {
        console.log('CreateTeacher Component error', error);
        this.error = error.error.message;
      }
    );
  }

  get teachers() {
    return this.form.get('teacher') as FormGroup;
  }
  get firstName() {
    return this.teachers.get('firstName') as FormControl;
  }
  get lastName() {
    return this.teachers.get('lastName') as FormControl;
  }
  get birthDate() {
    return this.teachers.get('birthDate') as FormControl;
  }
  get phoneNumber() {
    return this.teachers.get('phoneNumber') as FormControl;
  }

  get email() {
    return this.form.get('email') as FormControl;
  }
  get password() {
    return this.form.get('password') as FormControl;
  }
}
