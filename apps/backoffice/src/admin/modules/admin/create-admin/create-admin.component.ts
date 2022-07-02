import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILevel, ISpeciality } from '@univ-exam/common';
import Swal from 'sweetalert2';
import { CreateAdminService } from './create-admin.service';

@Component({
  selector: 'univ-exam-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css'],
})
export class CreateAdminComponent implements OnInit {
  form: FormGroup;
  specialities: ISpeciality[] = [];
  levels: ILevel[] = [];
  error: string;
  constructor(private readonly createAdminService: CreateAdminService) {
    this.error = '';
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
        ),
      ]),
      admin: new FormGroup({
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
  createAdmin() {
    this.createAdminService.addAdmin(this.form.value).subscribe(
      (response) => {
        console.log(response);
        this.form.reset();
        Swal.fire(
          'Success!',
          'The admin has been created successfully',
          'success'
        );
      },
      (error) => {
        console.log('CreateAdmin Component error', error);
        this.error = error.error.message;
      }
    );
  }

  get Admin() {
    return this.form.get('admin') as FormGroup;
  }
  get firstName() {
    return this.Admin.get('firstName') as FormControl;
  }
  get lastName() {
    return this.Admin.get('lastName') as FormControl;
  }
  get birthDate() {
    return this.Admin.get('birthDate') as FormControl;
  }
  get phoneNumber() {
    return this.Admin.get('phoneNumber') as FormControl;
  }
  get email() {
    return this.form.get('email') as FormControl;
  }
  get password() {
    return this.form.get('password') as FormControl;
  }
}
