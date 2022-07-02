import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ILevel, ISpeciality } from '@univ-exam/common';
import Swal from 'sweetalert2';
import { UpdateTeacherService } from './update-teacher.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'univ-exam-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.css'],
})
export class UpdateTeacherComponent implements OnInit {
  form: FormGroup;
  userId = '';
  teacherId = '';
  error: string;
  pipe = new DatePipe('en-US');

  constructor(
    private readonly updateTeacherService: UpdateTeacherService,
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

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.fetchTeacher(params['id']);
    });
  }

  fetchTeacher(id: string) {
    this.updateTeacherService.fetchTeacher(id).subscribe(
      (user) => {
        console.log('fetched teacher : ', user);

        if (user) {
          this.teacherId = user.teacher.id;
          this.form.setValue({
            email: user.email,
            password: '',
            teacher: {
              firstName: user.teacher.firstName,
              lastName: user.teacher.lastName,
              birthDate: this.pipe.transform(
                user.teacher.birthDate,
                'yyyy-MM-dd'
              ),
              phoneNumber: '0' + user.teacher.phoneNumber,
            },
          });
        }
      },
      (error) => {
        this.error = error.error.message;
      }
    );
  }
  updateTeacher() {
    const credentialsDto: any = { email: this.form.value.email };
    console.log('password :', this.form.value.password);
    if (this.form.value.password === '') delete this.form.value.password;
    else credentialsDto['password'] = this.form.value.password;
    this.updateTeacherService
      .updateTeacherCredentials(this.userId, credentialsDto)
      .subscribe(
        (response) => {
          this.updateTeacherService
            .updateTeacher(this.teacherId, this.form.value.teacher)
            .subscribe(
              (response) => {
                Swal.fire(
                  'Success!',
                  'The teacher has been Update successfully',
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
