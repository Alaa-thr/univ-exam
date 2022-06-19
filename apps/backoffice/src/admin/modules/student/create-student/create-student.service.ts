
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IStudent, QueryDto } from "@univ-exam/common";
import { Observable } from "rxjs";
import { environment } from "apps/backoffice/src/environments/environment";
@Injectable()
export class CreateStudentService{

    link = environment.api+"users/register/student";
    constructor(
        private readonly httpClient: HttpClient
    ){}

    addStudent(data: IStudent): Observable<any>{
        return this.httpClient.post(this.link,data);
    }
    getSpeciality(): Observable<any>{
        const link = environment.api+"speciality";
        return this.httpClient.get(link);
    }
    getLevelsBySpeciality(specialityId: string): Observable<any>{
        const link = environment.api+"speciality-module-level"
        return this.httpClient.get(link+`/${specialityId}`);
    }
}