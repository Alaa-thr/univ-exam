import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { QueryDto } from "@univ-exam/common";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()
export class ScheduledExamsService{

    constructor(
        private readonly httpClient: HttpClient
    ){}

    getScheduledExams(query: QueryDto): Observable<any>{
        const link = environment.api+"exams/scheduled-exams";
        return this.httpClient.get(link, {params: {...query}});
    }
    startExam():Promise<any>{
        const sentLink = environment.api+"exams/scheduled-exam/get-today-date-time";
        return this.httpClient.get(sentLink).toPromise();
    }
    getExamTypes(): Observable<any>{
        const link = environment.api+"exam-type"
        return this.httpClient.get(link);
    }
}