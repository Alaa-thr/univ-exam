
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IModule, QueryDto } from "@univ-exam/common";
import { Observable } from "rxjs";
import { environment } from "apps/backoffice/src/environments/environment";
@Injectable()
export class ModuleService{

    link = environment.api+"module"
    constructor(
        private readonly httpClient: HttpClient
    ){}

    addModule(data: IModule): Observable<any>{
        return this.httpClient.post(this.link, data);
    }

    getModule(query: QueryDto): Observable<any>{
        return this.httpClient.get(this.link,{params: {...query}});
    }

    deleteModule(id: string): Observable<any>{
        return this.httpClient.delete(this.link+`/${id}`);
    }
    
    updateModule(id: string, data: IModule): Observable<any>{
        return this.httpClient.patch(this.link+`/${id}`, data);
    }

    getSpecialities(): Observable<any>{
        const specialitylink = environment.api+"speciality";
        return this.httpClient.get(specialitylink);
    }
}