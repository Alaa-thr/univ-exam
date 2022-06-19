import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()
export class NotificationService{

    link: string;
    constructor(
        private readonly httpClient: HttpClient
    ){
        this.link =  environment.api+"notifications";
    }

    getNotification(): Observable<any>{
        return this.httpClient.get(this.link);
    }

    deleteNotification(id: string): Observable<any>{
        return this.httpClient.delete(this.link+`/${id}`);
    }
}