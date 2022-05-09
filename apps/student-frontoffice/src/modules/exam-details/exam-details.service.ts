import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ExamDetailsService{

    constructor(
        private readonly httpClient: HttpClient
    ){}

    getScheduledExams(): Observable<any>{
        const link = "http://localhost:3333/api/exams/scheduled-exams";
        return this.httpClient.get(link);
    }
}