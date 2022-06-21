import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "apps/backoffice/src/environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class StudentsAnswersDetailsService{

    link: string = environment.api+"exams/student-exam-answers";
    constructor(
        private readonly httpClient: HttpClient
    ){}

    getStudentExamAnswers(examId: string, studentId: string): Observable<any>{
        return this.httpClient.get(this.link+`/${examId}/${studentId}`);
    }
}