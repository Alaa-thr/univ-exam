import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class LoginInterceptor implements HttpInterceptor{

    helper = new JwtHelperService();
    constructor(private readonly authService: AuthService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('access_token');
        if(token){
            const isExpired = this.helper.isTokenExpired(token);
            console.log("token login intreceptor",isExpired)
            if(!isExpired){
                const newReq = req.clone({
                    setHeaders: {
                        Authorization: 'Bearer '+token
                    }
                })
                return next.handle(newReq);
            }     
        }
        this.authService.logout();
        return next.handle(req);
    } 

}

export const LoginInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: LoginInterceptor,
    multi: true
}