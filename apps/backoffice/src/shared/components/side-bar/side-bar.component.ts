import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'univ-exam-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  multiStepScript: any;
  constructor() {}

  ngOnInit(): void {
    this.initStepsScript();
  }
  private initStepsScript():void{
    this.multiStepScript = document.createElement("script");
    this.multiStepScript.type = "text/javascript";
    this.multiStepScript.src = "assets/js/script.js";
    document.body.appendChild(this.multiStepScript);
  }
}
