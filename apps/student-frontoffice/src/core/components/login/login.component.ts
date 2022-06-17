import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'univ-exam-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
 
  errorMessage: string = "";
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly headerService: HeaderService
  ) {}

  ngOnInit(): void {}

  login(data: NgForm){
    this.authService.login(data.value).subscribe(
      (response)=>{
        const token = response.token;
        this.authService.setLoggedValue(true);// declanché l'evenement
        localStorage.setItem('access_token', token);
        this.headerService.getUser();
        this.router.navigate(['exam/scheduled-exams']);
      },
      (error)=>{
        this.errorMessage = error.error.message;
      }
    );
  }
}
