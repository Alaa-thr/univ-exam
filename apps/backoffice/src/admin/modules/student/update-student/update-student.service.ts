import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStudent, QueryDto } from '@univ-exam/common';
import { Observable } from 'rxjs';
import { environment } from 'apps/backoffice/src/environments/environment';
@Injectable()
export class UpdateStudentService {
  constructor(private readonly httpClient: HttpClient) {}

  fetchStudent(id: string): Observable<any> {
    return this.httpClient.get(environment.api + `users/${id}`);
  }

  updateStudentCredentials(id: string, data: any): Observable<any> {
    return this.httpClient.patch(environment.api + `users/${id}`, data);
  }

  updateStudent(id: string, data: any): Observable<any> {
    return this.httpClient.patch(environment.api + `students/${id}`, data);
  }

  getSpeciality(): Observable<any> {
    const link = environment.api + 'speciality';
    return this.httpClient.get(link);
  }
  getLevelsBySpeciality(specialityId: string): Observable<any> {
    const link = environment.api + 'speciality-module-level';
    return this.httpClient.get(link + `/${specialityId}`);
  }
}
