import { Injectable } from "@angular/core";
import { IUser } from "@univ-exam/common";
import { BehaviorSubject } from "rxjs";
import { GetTokenService } from "../../services/get-token.service";

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