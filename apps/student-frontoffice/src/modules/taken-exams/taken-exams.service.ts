import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()
export class TakenExamsService {

    constructor(
        private readonly httpClient: HttpClient
    ){

    }
    getTakenExams(): Observable<any>{
        const link = environment.api+"exams/taken-exams";
        return this.httpClient.get(link);
    }
}