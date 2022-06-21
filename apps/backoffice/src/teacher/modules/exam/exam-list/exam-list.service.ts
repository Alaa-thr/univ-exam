
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { QueryDto } from "@univ-exam/common";
import { Observable } from "rxjs";
import { environment } from "apps/backoffice/src/environments/environment";
@Injectable()
export class ExamListService{

    link = environment.api+"exams";
    constructor(
        private readonly httpClient: HttpClient
    ){}

    getExams(query: QueryDto): Observable<any>{
        return this.httpClient.get(this.link,{params: {...query}});
    }
    getStudents(examId: string): Observable<any>{
        return this.httpClient.get(this.link+'/exam-student'+`/${examId}`);
    }
    deleteExam(examId: string): Observable<any>{
        return this.httpClient.delete(this.link+`/${examId}`);
    }
    startExam():Promise<any>{
        const sentLink = this.link+"/scheduled-exam/get-today-date-time";
        return this.httpClient.get(sentLink).toPromise();
    }
    publishExam(examId: string): Observable<any>{
        return this.httpClient.get(this.link+`/publish/${examId}`);
    }
}