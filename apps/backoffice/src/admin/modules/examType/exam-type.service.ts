
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ILevel, QueryDto } from "@univ-exam/common";
import { environment } from "apps/backoffice/src/environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class ExamTypeService{

    link = environment.api+"exam-type"
    constructor(
        private readonly httpClient: HttpClient
    ){}

    addLevel(data: ILevel): Observable<any>{
        return this.httpClient.post(this.link, data);
    }

    getExamType(query: QueryDto): Observable<any>{
        return this.httpClient.get(this.link,{params: {...query}});
    }

    deleteLevel(id: string): Observable<any>{
        return this.httpClient.delete(this.link+`/${id}`);
    }
    
    updateLevel(id: string, data: ILevel): Observable<any>{
        return this.httpClient.patch(this.link+`/${id}`, data);
    }
}