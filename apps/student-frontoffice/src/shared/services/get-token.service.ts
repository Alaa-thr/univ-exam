import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class GetTokenService{

    jwtHelper = new JwtHelperService();
    token: any;
    constructor(){}

    getUser(){
        this.token = localStorage.getItem('access_token');
        return this.decodeToken().userData;
    }
    private decodeToken(){
        return this.jwtHelper.decodeToken(this.token)
    }
}