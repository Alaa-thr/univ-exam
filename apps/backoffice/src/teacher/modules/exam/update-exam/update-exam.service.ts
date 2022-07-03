import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'apps/backoffice/src/environments/environment';
@Injectable()
export class UpdateExamService {
  linkSpeciality = environment.api + 'speciality';
  examlink = environment.api + 'exams';
  constructor(private readonly httpClient: HttpClient) {}

  fetchExam(id: string) {
    const link = environment.api + `exams/${id}`;
    return this.httpClient.get(link);
  }
  getExamType(): Observable<any> {
    const link = environment.api + 'exam-type';
    return this.httpClient.get(link);
  }
  getSpeciality(): Observable<any> {
    return this.httpClient.get(this.linkSpeciality);
  }
  getLevelsModulesBySpeciality(specialityId: string): Observable<any> {
    const link = environment.api + 'speciality-module-level';
    return this.httpClient.get(link + `/${specialityId}`);
  }
  addExam(data: any) {
    return this.httpClient.post(this.examlink, data);
  }
  getStudentsBySpecialityLevel(specialityId: string, levelId: string) {
    const link = environment.api + 'students';
    return this.httpClient.get(link + `/${specialityId}/${levelId}`);
  }
  getExamsOfThisDate(date: any) {
    console.log(date);
    const link = this.examlink + 'get-exam-this-date';
    return this.httpClient.get(link + `/${date}`);
  }
  redirectToStudentsList(url: string) {
    window.open(environment.api + '/' + url, '_blank');
  }
}
