import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'univ-exam-scheduled-exams',
  templateUrl: './scheduled-exams.component.html',
  styleUrls: ['./scheduled-exams.component.css'],
})
export class ScheduledExamsComponent implements OnInit {

  scheduledExams: any[] = [1,2];
  constructor() {}

  ngOnInit(): void {}
}
