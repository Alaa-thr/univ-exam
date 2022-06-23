import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SideBarService } from './side-bar.service';

@Component({
  selector: 'univ-exam-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {

  isLogged = false;
  multiStepScript: any;
  isAdmin = false;
  constructor(
    private readonly authService: AuthService,
    private readonly sideBarService: SideBarService
  ) {
  }

  ngOnInit(): void {
    this.sideBarService.getUser();
    this.initStepsScript();
    this.sideBarService.loggedUser.subscribe((value) =>{
      if(value){
        if(value.role == "ADMIN") this.isAdmin = true;
        else this.isAdmin = false;
      }   
    });
    this.authService.userIsLogged.subscribe((value) => { //recevoir l'evenement
      this.isLogged = value;
      if(value) this.sideBarService.getUser();
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
