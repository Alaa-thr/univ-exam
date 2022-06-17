import { Component, OnInit } from '@angular/core';
import { GetTokenService } from '../../shared/services/get-token.service';
import { IStudent, IUser } from '@univ-exam/common';
import { NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'univ-exam-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  user: IUser
  student?: IStudent
  errorCorrectionLevel: any;
  constructor(private readonly getTokenService: GetTokenService) {
    this.user = this.getTokenService.getUser();
    this.student = this.user.student;
    this.errorCorrectionLevel = NgxQrcodeErrorCorrectionLevels.MEDIUM
  }

  ngOnInit(): void {}
}
