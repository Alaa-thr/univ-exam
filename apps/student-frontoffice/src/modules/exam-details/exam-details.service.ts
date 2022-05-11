import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ExamDetailsService{

    link: string = "http://localhost:3333/api/exams/taken-exams";
    constructor(
        private readonly httpClient: HttpClient
    ){}

    getTakenExamsById(examId: string): Observable<any>{
        return this.httpClient.get(this.link+`/${examId}`);
    }
}