import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  todos: any;
  constructor(private http: HttpClient) {
    this.http
      .get('https://jsonplaceholder.typicode.com/todos')
      .subscribe((resp) => {
        this.todos = resp;
      });
  }
  title = 'challenge-gh';
}
