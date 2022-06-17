import { Injectable } from "@angular/core";
import { IUser } from "@univ-exam/common";
import { GetTokenService } from "apps/student-frontoffice/src/shared/services/get-token.service";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class HeaderService{

    private behavior = new BehaviorSubject<any>(null);
    loggedUser = this.behavior.asObservable();
    constructor(
        private readonly getTokenService: GetTokenService
    ){}

    getUser(){
        this.setLoggedUser(this.getTokenService.getUser());
    }
    setLoggedUser(user: IUser) {
        this.behavior.next(user);
    }
}