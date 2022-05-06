import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class TakenExamsService {

    constructor(
        private readonly httpClient: HttpClient
    ){

    }
    getTakenExams(): Observable<any>{
        const link = "http://localhost:3333/api/exams/taken-exams";
        return this.httpClient.get(link);
    }
}