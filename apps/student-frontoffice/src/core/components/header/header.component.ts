import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IUser } from '@univ-exam/common';
import { GetTokenService } from '../../../shared/services/get-token.service';
import { AuthService } from '../../services/auth.service';
import { HeaderService } from './header.service';

@Component({
  selector: 'univ-exam-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterContentChecked {

  isLogged: boolean = false;
  user?: IUser;
  constructor(
    private readonly authService: AuthService,
    private readonly headerService: HeaderService,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.headerService.getUser();
    this.headerService.loggedUser.subscribe((value) =>{
      this.user = value;
    });
    this.authService.userIsLogged.subscribe((value) => { //recevoir l'evenement
      this.isLogged = value;
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
