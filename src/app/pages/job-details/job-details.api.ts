import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JobDetailsApi {
  constructor(private http: HttpClient) {}

  getDetailsJob(jobId) {
    return this.http.get(
      `https://para-pruebas-back.herokuapp.com/trabajos?id=${jobId}`
    );
  }
}
