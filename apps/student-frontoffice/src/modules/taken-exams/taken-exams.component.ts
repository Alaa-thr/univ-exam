import { Component, Input, OnInit } from '@angular/core';
import { TakenExamsService } from './taken-exams.service';

@Component({
  selector: 'univ-exam-taken-exams',
  templateUrl: './taken-exams.component.html',
  styleUrls: ['./taken-exams.component.css'],
})
export class TakenExamsComponent implements OnInit {

  takenExams: any[];
  constructor(
    private readonly takenExamsService : TakenExamsService
  ) {
    this.takenExams = [];
  }

  ngOnInit(): void {
    this.takenExamsService.getTakenExams().subscribe(
      (response)=>{
        this.takenExams = response;
      },(error)=>{
        console.log("Taken Exams Component error",error);      
      }
    )
  }

  
}
