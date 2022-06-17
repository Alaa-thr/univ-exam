import { Component, OnInit } from '@angular/core';
import { IUser } from '@univ-exam/common';
import { GetTokenService } from '../../../shared/services/get-token.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'univ-exam-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = false;
  user: IUser;
  constructor(
    private readonly authService: AuthService,
    private readonly getTokenService: GetTokenService
  ) {
    this.user = this.getTokenService.getUser();
  }

  ngOnInit(): void {
    this.authService.userIsLogged.subscribe((value) => { //recevoir l'evenement
      this.isLogged = value;
    });
    this.isLogged = this.authService.isLogged();  
  }

  logout(){
    this.authService.logout();  
  }
}
