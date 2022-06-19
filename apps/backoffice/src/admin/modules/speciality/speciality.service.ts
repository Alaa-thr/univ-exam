
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ISpeciality, QueryDto } from "@univ-exam/common";
import { Observable } from "rxjs";
import { LevelService } from "../level/level.service";
import { environment } from "apps/backoffice/src/environments/environment";
@Injectable()
export class SpecialityService{

    link = environment.api+"speciality"
    constructor(
        private readonly httpClient: HttpClient,
        private readonly levelService: LevelService
    ){}

    addSpeciality(data: ISpeciality): Observable<any>{
        return this.httpClient.post(this.link, data);
    }

    getSpeciality(query: QueryDto): Observable<any>{
        return this.httpClient.get(this.link,{params: {...query}});
    }

    deleteSpeciality(id: string): Observable<any>{
        return this.httpClient.delete(this.link+`/${id}`);
    }
    
    updateSpeciality(id: string, data: ISpeciality): Observable<any>{
        return this.httpClient.patch(this.link+`/${id}`, data);
    }

    getLevel(){
        return this.levelService.getLevel({});
    }
}