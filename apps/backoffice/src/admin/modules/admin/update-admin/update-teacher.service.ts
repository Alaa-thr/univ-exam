import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITeacher, QueryDto } from '@univ-exam/common';
import { Observable } from 'rxjs';
import { environment } from 'apps/backoffice/src/environments/environment';
@Injectable()
export class UpdateTeacherService {
  constructor(private readonly httpClient: HttpClient) {}

  fetchTeacher(id: string): Observable<any> {
    return this.httpClient.get(environment.api + `users/${id}`);
  }

  updateTeacherCredentials(id: string, data: any): Observable<any> {
    return this.httpClient.patch(environment.api + `users/${id}`, data);
  }

  updateTeacher(id: string, data: any): Observable<any> {
    return this.httpClient.patch(environment.api + `teachers/${id}`, data);
  }
}
