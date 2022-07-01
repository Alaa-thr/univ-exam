import { Component, OnInit } from '@angular/core';
import { IExamType } from '@univ-exam/common';
import { HeaderService } from '../../core/components/header/header.service';
import { TakenExamsService } from './taken-exams.service';

@Component({
  selector: 'univ-exam-taken-exams',
  templateUrl: './taken-exams.component.html',
  styleUrls: ['./taken-exams.component.css'],
})
export class TakenExamsComponent implements OnInit {

  takenExams: any[];
  searchValue: string = '';
  searchExamType: string = '';
  examType: IExamType[] = [];
  constructor(
    private readonly takenExamsService : TakenExamsService,
    private readonly headerService: HeaderService
  ) {
    this.takenExams = [];
  }

  ngOnInit(): void {
    this.getTakenExams();
    this.takenExamsService.getExamTypes().subscribe(
      (response) => {
        this.examType = response.items;
      },(error)=>{
        console.log('Taken Exams Component error', error);
      }
    );
    this.headerService.search.subscribe((value) => { //recevoir l'evenement
      this.searchValue = value;
      this.searchExamType = '';
      this.getTakenExams();
    });
  }
  getTakenExams(){
    const query = {keyword:this.searchValue, type:this.searchExamType}
    this.takenExamsService.getTakenExams(query).subscribe(
      (response)=>{
        this.takenExams = response;
      },(error)=>{
        console.log("Taken Exams Component error",error);      
      }
    )
  }
  setSearchExamType(){
    this.searchValue = '';
    this.getTakenExams();
  }

  
}
