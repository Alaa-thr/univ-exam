import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { GetTokenService } from '../shared/services/get-token.service';

@Component({
  selector: 'univ-exam-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly getTokenService: GetTokenService
  ) {
    this.errorMessage = "";
  }

  ngOnInit(): void {}

  login(data: NgForm){
    this.authService.login(data.value).subscribe(
      (response)=>{
        const token = response.token;
        localStorage.setItem('access_token', token);
        this.authService.setLoggedValue(true);// declanché l'evenement
        const role = this.getTokenService.getUser().role;
        if(role == "TEACHER")this.router.navigate(['exam-list']);
        else this.router.navigate(['students-list']);
      },
      (error)=>{
        this.errorMessage = error.error.message;
      }
    );
  }
}
