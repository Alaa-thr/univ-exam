import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";

export class LoginInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('access_token');
        if(token){
            const newReq = req.clone({
                setHeaders: {
                    Authorization: 'Bearer '+token
                }
            })
            return next.handle(newReq); 
        }
        return next.handle(req);
    } 

}

export const LoginInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: LoginInterceptor,
    multi: true
}