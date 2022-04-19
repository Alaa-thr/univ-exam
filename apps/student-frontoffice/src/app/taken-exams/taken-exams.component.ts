import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'univ-exam-taken-exams',
  templateUrl: './taken-exams.component.html',
  styleUrls: ['./taken-exams.component.css'],
})
export class TakenExamsComponent implements OnInit {

  takenExams: any[] = [1,2];
  constructor() {}

  ngOnInit(): void {}
}
