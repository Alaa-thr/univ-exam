
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAdmin } from "@univ-exam/common";
import { Observable } from "rxjs";
import { environment } from '../../../../environments/environment'
@Injectable()
export class CreateAdminService{

    link = environment.api+"users/register/admin";
    constructor(
        private readonly httpClient: HttpClient
    ){}

    addAdmin(data: IAdmin): Observable<any>{
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