
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ILevel, QueryDto } from "@univ-exam/common";
import { Observable } from "rxjs";

@Injectable()
export class StudentService{

    link = "http://localhost:3333/api/students"
    constructor(
        private readonly httpClient: HttpClient
    ){}

    getStudents(query: QueryDto): Observable<any>{
        return this.httpClient.get(this.link,{params: {...query}});
    }

    deleteLevel(id: string): Observable<any>{
        return this.httpClient.delete(this.link+`/${id}`);
    }
    
    updateLevel(id: string, data: ILevel): Observable<any>{
        return this.httpClient.patch(this.link+`/${id}`, data);
    }
}