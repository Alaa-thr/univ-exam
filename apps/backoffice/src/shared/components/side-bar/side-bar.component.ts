import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'univ-exam-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  isLogged = false;
  multiStepScript: any;
  constructor(private readonly authService: AuthService) {
  }

  ngOnInit(): void {
    this.initStepsScript();
    this.authService.userIsLogged.subscribe((value) => { //recevoir l'evenement
      this.isLogged = value;
    });
    this.isLogged = this.authService.isLogged();  
  }
  private initStepsScript():void{
    this.multiStepScript = document.createElement("script");
    this.multiStepScript.type = "text/javascript";
    this.multiStepScript.src = "assets/js/script.js";
    document.body.appendChild(this.multiStepScript);
  }
}
