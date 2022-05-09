import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class NotificationService{

    link: string;
    constructor(
        private readonly httpClient: HttpClient
    ){
        this.link = "http://localhost:3333/api/notifications";
    }

    getNotification(): Observable<any>{
        return this.httpClient.get(this.link);
    }

    deleteNotification(id: string): Observable<any>{
        return this.httpClient.delete(this.link+`/${id}`);
    }
}