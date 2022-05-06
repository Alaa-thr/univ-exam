import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService{
    
    private behavior = new BehaviorSubject<boolean>(false);
    userIsLogged = this.behavior.asObservable();

    constructor(
        private readonly httpClient: HttpClient
    ){}

    login(data:any): Observable<any>{
        const link = "http://localhost:3333/api/users/login";
        return this.httpClient.post(link, data);
    }

    logout(): void{
        try{
            localStorage.removeItem('access_token');
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