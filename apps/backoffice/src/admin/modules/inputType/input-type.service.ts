
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ILevel, QueryDto } from "@univ-exam/common";
import { environment } from "apps/backoffice/src/environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class InputTypeService{

    link = environment.api+"input-type"
    constructor(
        private readonly httpClient: HttpClient
    ){}

    addInputType(data: ILevel): Observable<any>{
        return this.httpClient.post(this.link, data);
    }

    getInputType(query: QueryDto): Observable<any>{
        return this.httpClient.get(this.link,{params: {...query}});
    }

    deleteInputType(id: string): Observable<any>{
        return this.httpClient.delete(this.link+`/${id}`);
    }
    
    updateInputType(id: string, data: ILevel): Observable<any>{
        return this.httpClient.patch(this.link+`/${id}`, data);
    }
}