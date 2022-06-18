import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()
export class TakeExamService{

    link: string = environment.api+"exams";
    constructor(
        private readonly httpClient: HttpClient
    ){}
    getScheduledExamById(examId: string): Observable<any>{
        const sentLink = this.link+"/scheduled-exam"
        return this.httpClient.get(sentLink+`/${examId}`);
    }
    addStudentAnswers(data: FormData):Observable<any>{
        const sentLink = environment.api+"answers/student-answers";
        return this.httpClient.post(sentLink,data);
    }
    startExam():Promise<any>{
        const sentLink = this.link+"/scheduled-exam/get-exam-started-time";
        return this.httpClient.get(sentLink).toPromise();
    }
}