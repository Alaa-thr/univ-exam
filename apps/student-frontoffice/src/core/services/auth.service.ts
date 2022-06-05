import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import {LoginUserDto} from '@univ-exam/common'

@Injectable({
  providedIn: 'root'
})
export class AuthService{
    
    private behavior = new BehaviorSubject<boolean>(false);
    userIsLogged = this.behavior.asObservable();

    constructor(
        private readonly httpClient: HttpClient,
        private readonly router: Router
    ){}

    login(data:any): Observable<any>{
        const link = "http://localhost:3333/api/users/login";
        return this.httpClient.post(link, data);
    }

    logout(): void{
        try{
            this.setLoggedValue(false);// declanché l'evenement
            localStorage.removeItem('access_token');
            this.router.navigate(['login']);
        }catch(error){
            console.log('error logout', error);
        }   
    }

    isLogged(){
        return !! localStorage.getItem('access_token');
    }

    setLoggedValue(istrue: boolean) {
        this.behavior.next(istrue);
    }

}