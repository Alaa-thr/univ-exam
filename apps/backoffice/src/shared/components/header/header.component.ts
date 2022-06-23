import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IUser } from '@univ-exam/common';
import { AuthService } from '../../services/auth.service';
import { HeaderService } from './header.service';

@Component({
  selector: 'univ-exam-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  isLogged = false;
  user?: IUser;
  isAdmin = false;
  constructor(
    private readonly authService: AuthService,
    private readonly headerService: HeaderService,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.headerService.getUser();
    this.headerService.loggedUser.subscribe((value) =>{
      if(value){
        this.user = value.userData;
        if(value.role == "ADMIN") this.isAdmin = true;
        else this.isAdmin = false;
      }
    });
    this.authService.userIsLogged.subscribe((value) => { //recevoir l'evenement
      this.isLogged = value;
      if(value)this.headerService.getUser();
    });
    this.isLogged = this.authService.isLogged();  
  }
 
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  logout(){
    this.authService.logout();  
  }
}
