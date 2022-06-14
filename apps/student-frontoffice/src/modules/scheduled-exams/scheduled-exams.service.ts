import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ScheduledExamsService{

    constructor(
        private readonly httpClient: HttpClient
    ){}

    getScheduledExams(): Observable<any>{
        const link = "http://localhost:3333/api/exams/scheduled-exams";
        return this.httpClient.get(link);
    }
    startExam():Promise<any>{
        const sentLink = "http://localhost:3333/api/exams/scheduled-exam/get-today-date-time";
        return this.httpClient.get(sentLink).toPromise();
    }
}