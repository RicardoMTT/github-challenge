import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Query } from './home.service';

@Injectable({
  providedIn: 'root',
})
export class HomeApi {
  constructor(private http: HttpClient) {}

  // getJobsByWorkType(workType) {
  //   console.log(workType);

  //   return this.http
  //     .get(`https://para-pruebas-back.herokuapp.com/trabajos?tipo=${workType}`)
  //     .pipe(
  //       map((jobs) => {
  //         return jobs;
  //       })
  //     );
  // }

  // getJobsByCityRadio(city) {
  //   console.log(city);

  //   return this.http
  //     .get(`https://para-pruebas-back.herokuapp.com/trabajos?ciudad=${city}`)
  //     .pipe(
  //       map((jobs) => {
  //         return jobs;
  //       })
  //     );
  // }
  // getJobs(): Observable<any> {
  //   return this.http
  //     .get('https://para-pruebas-back.herokuapp.com/trabajos')
  //     .pipe(
  //       map((jobs) => {
  //         return jobs;
  //       })
  //     );
  // }

  getCities() {
    return this.http.get('https://para-pruebas-back.herokuapp.com/ciudades');
  }

  getJobsByQuery(query: Query) {
    console.log(query);
    if (query.query != '' && query.city == '' && query.type == '') {
      return this.http.get(
        `https://para-pruebas-back.herokuapp.com/trabajos?titulo_contains=${query.query}`
      );
    } else if (query.city != '' && query.query == '' && query.type == '') {
      return this.http.get(
        `https://para-pruebas-back.herokuapp.com/trabajos?ciudad=${query.city}`
      );
    } else if (query.type != '' && query.query == '' && query.city == '') {
      return this.http.get(
        `https://para-pruebas-back.herokuapp.com/trabajos?tipo=${query.type}`
      );
    } else if (query.query != '' && query.type != '' && query.city == '') {
      return this.http.get(
        `https://para-pruebas-back.herokuapp.com/trabajos?titulo_contains=${query.query}&&tipo=${query.type}`
      );
    } else if (query.query == '' && query.type != '' && query.city != '') {
      console.log('entro');

      return this.http.get(
        `https://para-pruebas-back.herokuapp.com/trabajos?tipo=${query.type}&&ciudad=${query.city}`
      );
    } else if (query.query != '' && query.type == '' && query.city != '') {
      return this.http.get(
        `https://para-pruebas-back.herokuapp.com/trabajos?titulo_contains=${query.query}&&ciudad=${query.city}`
      );
    } else if (query.query != '' && query.type != '' && query.city != '') {
      return this.http.get(
        `https://para-pruebas-back.herokuapp.com/trabajos?titulo_contains=${query.query}&&tipo=${query.type}&&ciudad=${query.city}`
      );
    } else {
      return this.http.get('https://para-pruebas-back.herokuapp.com/trabajos');
    }

    // const params = new HttpParams();
    // params.set('query', query.query);
    // params.set('type', query.type);
    // params.set('city', query.city);
    // return this.http.get('http://localhost:3001/trabajos/filtrado', { params });
  }
  // getJobsByKeyword(term) {
  //   const params = new HttpParams();
  //   params.set('description', term);
  //   return this.http
  //     .get(
  //       `https://para-pruebas-back.herokuapp.com/trabajos?titulo_contains=${term}`
  //     )
  //     .pipe(
  //       map((jobs) => {
  //         return jobs;
  //       })
  //     );
  // }
}
