import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class GetTokenService{

    jwtHelper = new JwtHelperService();
    constructor(){}

    getUser(){
        const token = localStorage.getItem('access_token');
        if(token){
            return this.decodeToken(token).userData;
        }
        return null;
        
    }
    private decodeToken(token: any){
        return this.jwtHelper.decodeToken(token)
    }
}