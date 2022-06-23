import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";

export class IsAdminGuard implements CanActivate{

    jwtHelper = new JwtHelperService();

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const token = localStorage.getItem('access_token');
        if(token){
            const decodeToken = this.jwtHelper.decodeToken(token);
            if(decodeToken.role == 'ADMIN') return true;
        }
        return false;
    }
    
}