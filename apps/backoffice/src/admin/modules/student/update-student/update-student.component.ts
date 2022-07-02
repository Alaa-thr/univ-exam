import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ILevel, ISpeciality } from '@univ-exam/common';
import Swal from 'sweetalert2';
import { UpdateStudentService } from './update-student.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'univ-exam-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css'],
})
export class UpdateStudentComponent implements OnInit {
  form: FormGroup;
  userId = '';
  studentId = '';
  error: string;
  pipe = new DatePipe('en-US');
  specialities: ISpeciality[] = [];
  levels: ILevel[] = [];
  constructor(
    private readonly updateStudentService: UpdateStudentService,
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
      student: new FormGroup({
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
        studentNumber: new FormControl('', [
          Validators.required,
          Validators.minLength(12),
        ]),
        speciality: new FormControl('', [Validators.required]),
        level: new FormControl('', [Validators.required]),
      }),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.fetchStudent(params['id']);
    });

    this.updateStudentService.getSpeciality().subscribe(
      (response) => {
        this.specialities = response.items;
      },
      (error) => {
        console.log('updateStudent component error', error);
      }
    );
  }

  fetchStudent(id: string) {
    this.updateStudentService.fetchStudent(id).subscribe(
      (user) => {
        console.log('fetched student : ', user);

        if (user) {
          const obj = {
            email: user.email,
            password: '',
            student: {
              firstName: user.student.firstName,
              lastName: user.student.lastName,
              birthDate: this.pipe.transform(
                user.student.birthDate,
                'yyyy-MM-dd'
              ),
              phoneNumber: '0' + user.student.phoneNumber,
              studentNumber: user.student.studentNumber,
              speciality: user.student.speciality.id,
              level: user.student.level.id,
            },
          };

          this.studentId = user.student.id;
          this.form.setValue({ ...obj });

          this.getLevel({
            target: { value: user.student.speciality.id },
          });
          console.log('obj : ', obj);
        }
      },
      (error) => {
        this.error = error.error.message;
      }
    );
  }
  updateStudent() {
    const credentialsDto: any = { email: this.form.value.email };
    console.log('password :', this.form.value.password);
    if (this.form.value.password === '') delete this.form.value.password;
    else credentialsDto['password'] = this.form.value.password;
    this.updateStudentService
      .updateStudentCredentials(this.userId, credentialsDto)
      .subscribe(
        (response) => {
          this.updateStudentService
            .updateStudent(this.studentId, this.form.value.student)
            .subscribe(
              (response) => {
                Swal.fire(
                  'Success!',
                  'The student has been Update successfully',
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

  getLevel(event: any) {
    const specialityId = event.target.value;
    this.updateStudentService.getLevelsBySpeciality(specialityId).subscribe(
      (response) => {
        this.levels = [];
        const specialityLevel = response;
        for (let i = 0; i < specialityLevel.length; i++) {
          const index = this.levels.findIndex((object) => {
            return object.id === specialityLevel[i].level.id;
          });
          if (index == -1) {
            this.levels.push(specialityLevel[i].level);
          }
        }
        this.levels.sort((a, b) => a.name.localeCompare(b.name));

        console.log('level : ', this.level);
        console.log('level : ', this.level);
      },
      (error) => {
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
