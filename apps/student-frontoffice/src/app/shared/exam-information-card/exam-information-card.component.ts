import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'univ-exam-exam-information-card',
  templateUrl: './exam-information-card.component.html',
  styleUrls: ['./exam-information-card.component.css'],
})
export class ExamInformationCardComponent implements OnInit {

  users: any[] = [1,2];
  constructor() {}

  ngOnInit(): void {}
}
