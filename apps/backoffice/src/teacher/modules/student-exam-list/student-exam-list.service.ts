
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class StudentExamListService{

    constructor(
        private readonly httpClient: HttpClient
    ){}

    getStudentsBySpecialityLevel(specialityId: string, levelId: string){
        const link = "http://localhost:3333/api/students"
        return this.httpClient.get(link+`/${specialityId}/${levelId}`);
    }
}