
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "apps/backoffice/src/environments/environment";
@Injectable()
export class StudentExamListService{

    constructor(
        private readonly httpClient: HttpClient
    ){}

    getStudentsBySpecialityLevel(specialityId: string, levelId: string){
        const link = environment.api+"students"
        return this.httpClient.get(link+`/${specialityId}/${levelId}`);
    }
}