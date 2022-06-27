import { Injectable } from "@angular/core";
import { IUser } from "@univ-exam/common";
import { GetTokenService } from "../../../shared/services/get-token.service";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class HeaderService{

    private behavior = new BehaviorSubject<any>(null);
    private behaviorSearch = new BehaviorSubject<string>('');
    loggedUser = this.behavior.asObservable();
    search = this.behaviorSearch.asObservable();
    constructor(
        private readonly getTokenService: GetTokenService
    ){}
    getUser(){
        this.setLoggedUser(this.getTokenService.getUser());
    }
    setLoggedUser(user: IUser) {
        this.behavior.next(user);
    }
    setSearch(search: string) {
        this.behaviorSearch.next(search);
    }
}