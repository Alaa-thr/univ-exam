import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { QueryDto } from "@univ-exam/common";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()
export class TakenExamsService {

    constructor(
        private readonly httpClient: HttpClient
    ){

    }
    getTakenExams(query: QueryDto): Observable<any>{
        const link = environment.api+"exams/taken-exams";
        return this.httpClient.get(link, {params: {...query}});
    }
    getExamTypes(): Observable<any>{
        const link = environment.api+"exam-type"
        return this.httpClient.get(link);
    }
}