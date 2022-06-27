import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()
export class ScheduledExamsService{

    constructor(
        private readonly httpClient: HttpClient
    ){}

    getScheduledExams(): Observable<any>{
        const link = environment.api+"exams/scheduled-exams";
        return this.httpClient.get(link);
    }
    startExam():Promise<any>{
        const sentLink = environment.api+"exams/scheduled-exam/get-today-date-time";
        return this.httpClient.get(sentLink).toPromise();
    }
}