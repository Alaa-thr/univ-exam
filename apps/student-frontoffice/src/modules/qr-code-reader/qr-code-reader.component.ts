import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../../core/components/header/header.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'univ-exam-qr-code-reader',
  templateUrl: './qr-code-reader.component.html',
  styleUrls: ['./qr-code-reader.component.css'],
})
export class QrCodeReaderComponent implements OnInit {
  
  errorMessage: string;
  waitForSendingData: boolean = false;
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly headerService: HeaderService
  ) {
    this.errorMessage = '';
  }

  ngOnInit(): void {}

  scanSucess(result: any){
    if(!this.waitForSendingData){
      this.loginn(result);
    }
  }
  loginn(code: string){
    this.authService.qrLogin({code: code}).subscribe(
      (response)=>{
        this.errorMessage = '';
        this.waitForSendingData = true;
        const token = response.token;
        this.authService.setLoggedValue(true);
        localStorage.setItem('access_token', token);
        this.headerService.getUser();
        this.router.navigate(['exam/scheduled-exams']);
      },
      (error)=>{
        this.waitForSendingData = false;
        this.errorMessage = error.error.message;
      }
    );
  }

  permissionResponse(result: boolean){
    if(!result) this.errorMessage = ' you need to turn on your camera';
    else this.errorMessage = '';
  }
}