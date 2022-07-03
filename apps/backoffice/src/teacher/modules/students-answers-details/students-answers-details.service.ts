import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IQuestion } from "@univ-exam/common";
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
    reCalculateGrade(examId: string, studentId: string, questions: IQuestion): Observable<any>{
        return this.httpClient.post(environment.api+'answers/recalculate-grade', {examId,studentId, questions});
    }
    setCheatedStudent(examId: string, studentId: string, data: any): Observable<any>{
        return this.httpClient.post(environment.api+'answers/cheated-student', {grade: -2, examId,studentId, data});
    }
}