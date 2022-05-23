import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class TakeExamService{

    link: string = "http://localhost:3333/api/exams";
    constructor(
        private readonly httpClient: HttpClient
    ){}

    getScheduledExamById(examId: string): Observable<any>{
        const sentLink = this.link+"/scheduled-exam"
        return this.httpClient.get(sentLink+`/${examId}`);
    }

    addStudentAnswers(data: any):Observable<any>{
        const sentLink = this.link+"/take-exam";
        return this.httpClient.post(sentLink,data);
    }
    startExam(examId: string, startExamTime: string):Observable<any>{
        const sentLink = this.link+"/scheduled-exam"
        const data = {
            startExam: startExamTime
        };
        return this.httpClient.patch(sentLink+`/${examId}`,data);
    }
}