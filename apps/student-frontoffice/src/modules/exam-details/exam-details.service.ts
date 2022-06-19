import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()
export class ExamDetailsService{

    link: string =  environment.api+"exams/taken-exams";
    constructor(
        private readonly httpClient: HttpClient
    ){}

    getTakenExamsById(examId: string): Observable<any>{
        return this.httpClient.get(this.link+`/${examId}`);
    }
}