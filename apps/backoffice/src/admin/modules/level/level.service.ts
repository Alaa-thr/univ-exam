
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ILevel } from "@univ-exam/common";
import { Observable } from "rxjs";

@Injectable()
export class LevelService{

    link = "http://localhost:3333/api/level"
    constructor(
        private readonly httpClient: HttpClient
    ){}

    addLevel(data: ILevel): Observable<any>{
        return this.httpClient.post(this.link, data);
    }

    getLevel(): Observable<any>{
        return this.httpClient.get(this.link+'?limit=10');
    }

    deleteLevel(id: string): Observable<any>{
        return this.httpClient.delete(this.link+`/${id}`);
    }
    
    updateLevel(id: string, data: ILevel): Observable<any>{
        return this.httpClient.patch(this.link+`/${id}`, data);
    }
}