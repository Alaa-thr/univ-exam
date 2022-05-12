import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class TakeExamService{

    link: string = "http://localhost:3333/api/exams/scheduled-exam";
    constructor(
        private readonly httpClient: HttpClient
    ){}

    getScheduledExamById(examId: string): Observable<any>{
        return this.httpClient.get(this.link+`/${examId}`);
    }
}