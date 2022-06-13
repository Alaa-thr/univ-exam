import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IStudent } from '@univ-exam/common';
import { StudentExamListService } from './student-exam-list.service';

@Component({
  selector: 'univ-exam-student-exam-list',
  templateUrl: './student-exam-list.component.html',
  styleUrls: ['./student-exam-list.component.css'],
})
export class StudentExamListComponent implements OnInit {

  students: any;
  constructor(
    private readonly studentExamListService: StudentExamListService,
    private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => { 
        const specialityId = params['specialityId'];
        const levelId = params['levelId'];
        this.studentExamListService.getStudentsBySpecialityLevel(specialityId,levelId).subscribe(
          (response) => {
            this.students = response;
            console.log("students ",response)
          },(error)=>{
            console.log('StudentExamList Component error', error);
          }
        );
      }
    )  
  }
}
