import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ILevel, ISpeciality } from '@univ-exam/common';
import Swal from 'sweetalert2';
import { UpdateAdminService } from './update-admin.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'univ-exam-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css'],
})
export class UpdateAdminComponent implements OnInit {
  form: FormGroup;
  userId = '';
  adminId = '';
  error: string;
  pipe = new DatePipe('en-US');

  constructor(
    private readonly updateAdminService: UpdateAdminService,
    private route: ActivatedRoute
  ) {
    this.error = '';
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
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

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.fetchAdmin(params['id']);
    });
  }

  fetchAdmin(id: string) {
    this.updateAdminService.fetchAdmin(id).subscribe(
      (user) => {
        console.log('fetched admin : ', user);

        if (user) {
          this.adminId = user.admin.id;
          this.form.setValue({
            email: user.email,
            password: '',
            admin: {
              firstName: user.admin.firstName,
              lastName: user.admin.lastName,
              birthDate: this.pipe.transform(
                user.admin.birthDate,
                'yyyy-MM-dd'
              ),
              phoneNumber: '0' + user.admin.phoneNumber,
            },
          });
        }
      },
      (error) => {
        this.error = error.error.message;
      }
    );
  }
  updateAdmin() {
    const credentialsDto: any = { email: this.form.value.email };
    console.log('password :', this.form.value.password);
    if (this.form.value.password === '') delete this.form.value.password;
    else credentialsDto['password'] = this.form.value.password;
    this.updateAdminService
      .updateAdminCredentials(this.userId, credentialsDto)
      .subscribe(
        (response) => {
          this.updateAdminService
            .updateAdmin(this.adminId, this.form.value.admin)
            .subscribe(
              (response) => {
                Swal.fire(
                  'Success!',
                  'The admin has been Update successfully',
                  'success'
                );
              },
              (error) => {
                this.error = error.error.message;
              }
            );
        },
        (error) => {
          this.error = error.error.message;
        }
      );
  }

  get admins() {
    return this.form.get('admin') as FormGroup;
  }
  get firstName() {
    return this.admins.get('firstName') as FormControl;
  }
  get lastName() {
    return this.admins.get('lastName') as FormControl;
  }
  get birthDate() {
    return this.admins.get('birthDate') as FormControl;
  }
  get phoneNumber() {
    return this.admins.get('phoneNumber') as FormControl;
  }

  get email() {
    return this.form.get('email') as FormControl;
  }
  get password() {
    return this.form.get('password') as FormControl;
  }
}
