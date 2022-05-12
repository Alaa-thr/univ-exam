import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'univ-exam-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = false;
  constructor(
    private readonly authService: AuthService
  ) {}

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
