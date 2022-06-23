import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BlankPathGuard implements CanActivate{

    jwtHelper = new JwtHelperService();
    constructor(
        private readonly router: Router
    ){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const token = localStorage.getItem('access_token');
        if(token){
            const decodeToken = this.jwtHelper.decodeToken(token);
            if(decodeToken.role == 'ADMIN') return this.router.navigate(['students-list']);
        }
        return this.router.navigate(['exam-list']);
    }
    
}