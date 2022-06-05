import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'univ-exam-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {

  currentpage: string;
  totalRecords: number;
  @Input() records: any[]
  @Output() paginationInfo = new EventEmitter();

  constructor() {
    this.currentpage = "1";
    this.totalRecords = 0;
    this.records = [];
  }

  ngOnInit(): void {
    this.totalRecords = this.records.length;
  }

  sendInfoOfPagination(){
    this.paginationInfo.emit({
      currentpage: this.currentpage,
      totalRecords: this.totalRecords
    })
  }
}
