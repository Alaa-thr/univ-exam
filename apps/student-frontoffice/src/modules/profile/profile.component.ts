import { Component, OnInit } from '@angular/core';
import { GetTokenService } from '../../shared/services/get-token.service';
import { IStudent, IUser } from '@univ-exam/common';
import { NgxQrcodeErrorCorrectionLevels, NgxQrcodeElementTypes } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'univ-exam-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  user: IUser
  student?: IStudent
  errorCorrectionLevel: any;
  elementType: any;
  url: any;
  constructor(private readonly getTokenService: GetTokenService) {
    this.user = this.getTokenService.getUser();
    this.student = this.user.student;
    this.errorCorrectionLevel = NgxQrcodeErrorCorrectionLevels.MEDIUM
    this.elementType = NgxQrcodeElementTypes.CANVAS;
  }

  ngOnInit(): void {}

  getQrCodeAsImage(): void {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    this.url= canvas.toDataURL("image/jpeg").toString();
    }
}
