import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@univ-exam/api-interfaces';

@Component({
  selector: 'univ-exam-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  $hello = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}
}
