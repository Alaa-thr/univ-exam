import { Component, Input, OnInit } from '@angular/core';
import { QueryDto } from '@univ-exam/common';

@Component({
  selector: 'univ-exam-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {

  @Input() callbackFunction!: (query: QueryDto,scope:any) => void;
  currentPage: number; 
  totalPages: number;
  itemsLimit: number;
  constructor() {
    this.currentPage = 0;
    this.totalPages = 0;
    this.itemsLimit = 10;
  }

  ngOnInit(): void {
    
  }
//  ngAfterViewInit(): void {
//    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
//    //Add 'implements AfterViewInit' to the class.
//    this.callbackFunction({page: this.currentPage, limit: this.itemsLimit});
//  }
//   changePage(page: number){
//     if(page < 0) return;
//     this.currentPage = page;
//     const query = {page: this.currentPage, limit: this.itemsLimit}
//     this.callbackFunction(query);
//   }
}
