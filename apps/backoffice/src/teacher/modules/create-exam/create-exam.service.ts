
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class CreateExamService{

    linkSpeciality = "http://localhost:3333/api/speciality"
    constructor(
        private readonly httpClient: HttpClient
    ){}

    getExamType(): Observable<any>{
        const link = "http://localhost:3333/api/exam-type"
        return this.httpClient.get(link);
    }

    getSpeciality(): Observable<any>{
        return this.httpClient.get(this.linkSpeciality);
    }

    getLevelsBySpeciality(specialityId: string): Observable<any>{
        return this.httpClient.get(this.linkSpeciality+`/${specialityId}`);
    }
}