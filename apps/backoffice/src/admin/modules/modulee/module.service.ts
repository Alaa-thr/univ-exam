
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IModule } from "@univ-exam/common";
import { Observable } from "rxjs";

@Injectable()
export class ModuleService{

    link = "http://localhost:3333/api/module"
    constructor(
        private readonly httpClient: HttpClient
    ){}

    addModule(data: IModule): Observable<any>{
        return this.httpClient.post(this.link, data);
    }

    getModule(): Observable<any>{
        return this.httpClient.get(this.link+'?limit=10');
    }

    deleteModule(id: string): Observable<any>{
        return this.httpClient.delete(this.link+`/${id}`);
    }
    
    updateModule(id: string, data: IModule): Observable<any>{
        return this.httpClient.patch(this.link+`/${id}`, data);
    }

    getSpecialities(): Observable<any>{
        const specialityLink = "http://localhost:3333/api/speciality";
        return this.httpClient.get(specialityLink);
    }

    getLevels(): Observable<any>{
        const specialityLink = "http://localhost:3333/api/level";
        return this.httpClient.get(specialityLink);
    }
}