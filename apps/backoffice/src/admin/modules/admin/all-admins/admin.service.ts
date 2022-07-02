import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILevel, QueryDto } from '@univ-exam/common';
import { Observable } from 'rxjs';
import { environment } from 'apps/backoffice/src/environments/environment';
@Injectable()
export class AdminService {
  link = environment.api + 'admin';
  constructor(private readonly httpClient: HttpClient) {}

  getAdmins(query: QueryDto): Observable<any> {
    return this.httpClient.get(this.link, { params: { ...query } });
  }

  deleteAdmin(id: string): Observable<any> {
    return this.httpClient.delete(this.link + `/${id}`);
  }

  updateLevel(id: string, data: ILevel): Observable<any> {
    return this.httpClient.patch(this.link + `/${id}`, data);
  }
}
