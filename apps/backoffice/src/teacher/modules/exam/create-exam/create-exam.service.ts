
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class CreateExamService{

    linkSpeciality = "http://localhost:3333/api/speciality";
    examlink = "http://localhost:3333/api/exams";
    constructor(
        private readonly httpClient: HttpClient
    ){}

    getExamType(): Observable<any>{
        const link = "http://localhost:3333/api/exam-type"
        return this.httpClient.get(link);
    }
    getSpeciality(): Observable<any>{
        return this.httpClient.get(this.linkSpeciality);
    }
    getLevelsModulesBySpeciality(specialityId: string): Observable<any>{
        const link = "http://localhost:3333/api/speciality-module-level"
        return this.httpClient.get(link+`/${specialityId}`);
    }
    addExam(data: any){
        return this.httpClient.post(this.examlink, data);
    }
    getStudentsBySpecialityLevel(specialityId: string, levelId: string){
        const link = "http://localhost:3333/api/students"
        return this.httpClient.get(link+`/${specialityId}/${levelId}`);
    }
}