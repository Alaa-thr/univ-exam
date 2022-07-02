import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAdmin, QueryDto } from '@univ-exam/common';
import { Observable } from 'rxjs';
import { environment } from 'apps/backoffice/src/environments/environment';
@Injectable()
export class UpdateAdminService {
  constructor(private readonly httpClient: HttpClient) {}

  fetchAdmin(id: string): Observable<any> {
    return this.httpClient.get(environment.api + `users/${id}`);
  }

  updateAdminCredentials(id: string, data: any): Observable<any> {
    return this.httpClient.patch(environment.api + `users/${id}`, data);
  }

  updateAdmin(id: string, data: any): Observable<any> {
    return this.httpClient.patch(environment.api + `admin/${id}`, data);
  }
}
