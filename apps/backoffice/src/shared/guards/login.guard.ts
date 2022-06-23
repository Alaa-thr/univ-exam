import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
  })
export class LoginGuard implements CanActivate{

    constructor(
        private readonly router: Router
    ){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const isLogged = localStorage.getItem('access_token');
        if(isLogged){
            return true;
        }else{
            return this.router.navigate(['login']);
        }
    }

}