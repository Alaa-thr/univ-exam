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
    addStudentAnswers(data: FormData):Observable<any>{
        const sentLink = "http://localhost:3333/api/answers/student-answers";
        return this.httpClient.post(sentLink,data);
    }
    startExam():Promise<any>{
        const sentLink = this.link+"/scheduled-exam/get-exam-started-time";
        return this.httpClient.get(sentLink).toPromise();
    }
}