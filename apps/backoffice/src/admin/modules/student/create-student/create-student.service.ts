
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IStudent, QueryDto } from "@univ-exam/common";
import { Observable } from "rxjs";

@Injectable()
export class CreateStudentService{

    link = "http://localhost:3333/api/users/register/student";
    constructor(
        private readonly httpClient: HttpClient
    ){}

    addStudent(data: IStudent): Observable<any>{
        return this.httpClient.post(this.link,data);
    }
    getSpeciality(): Observable<any>{
        const link = "http://localhost:3333/api/speciality";
        return this.httpClient.get(link);
    }
    getLevelsBySpeciality(specialityId: string): Observable<any>{
        const link = "http://localhost:3333/api/speciality-module-level"
        return this.httpClient.get(link+`/${specialityId}`);
    }
}