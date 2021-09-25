import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Job } from 'src/app/models/job.model';
import { JobsStore } from 'src/app/stores/job/job.store';
import { HomeApi } from './home.api';

export interface Query {
  query: string;
  type: string;
  city: string;
}

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private sharingQueryObservable$: BehaviorSubject<Query> = new BehaviorSubject(
    {
      query: '',
      type: '',
      city: '',
    }
  );

  get sharingQueryObservable() {
    return this.sharingQueryObservable$.asObservable();
  }

  set sharingQueryObservableData(data: Query) {
    this.sharingQueryObservable$.next(data);
  }

  constructor(private api: HomeApi, private jobsStore: JobsStore) {}

  // getJobsByWorkType(workType) {
  //   this.jobsStore.setLoading(true);

  //   this.api
  //     .getJobsByWorkType(workType)
  //     .pipe(
  //       tap((response: any[]) => {
  //         console.log('resp', response);
  //         this.jobsStore.remove();

  //         const newJobsId = response.map((elm) => elm.id);
  //         this.jobsStore.upsertMany(response);
  //         this.jobsStore.update((state) => {
  //           return {
  //             ...state,

  //             jobsID: newJobsId,
  //           };
  //         });
  //       }),
  //       tap((_) => this.jobsStore.setLoading(false)),
  //       catchError((err) => {
  //         console.log('error ', err);

  //         return of();
  //       })
  //     )
  //     .subscribe(
  //       (resp) => console.log('resp', resp),
  //       (error) => {
  //         console.log('error', error);
  //       }
  //     );
  // }

  // getCitiesByInputRadio(city) {
  //   this.jobsStore.setLoading(true);

  //   this.api
  //     .getJobsByCityRadio(city)
  //     .pipe(
  //       tap((response: any[]) => {
  //         console.log('resp', response);
  //         this.jobsStore.remove();

  //         const newJobsId = response.map((elm) => elm.id);
  //         this.jobsStore.upsertMany(response);
  //         this.jobsStore.update((state) => {
  //           return {
  //             ...state,

  //             jobsID: newJobsId,
  //           };
  //         });
  //       }),
  //       tap((_) => this.jobsStore.setLoading(false)),
  //       catchError((err) => {
  //         console.log('error ', err);

  //         return of();
  //       })
  //     )
  //     .subscribe(
  //       (resp) => console.log('resp', resp),
  //       (error) => {
  //         console.log('error', error);
  //       }
  //     );
  // }
  // getApiService() {
  //   this.jobsStore.setLoading(true);
  //   this.api
  //     .getJobs()
  //     .pipe(
  //       tap((response: any[]) => {
  //         console.log(response);
  //         // hasReachedLimit: newPagesIds.length === count,
  //         this.jobsStore.remove();

  //         const newJobsId = response.map((elm) => elm.id);
  //         this.jobsStore.upsertMany(response);
  //         const numbersPage = Math.ceil(response.length / 5);
  //         this.jobsStore.update((state) => {
  //           return {
  //             ...state,

  //             jobsID: newJobsId,
  //           };
  //         });
  //       }),
  //       tap((_) => this.jobsStore.setLoading(false)),
  //       catchError((err) => {
  //         console.log('error ', err);

  //         return of();
  //       })
  //     )
  //     .subscribe(
  //       (resp) => console.log('resp', resp),
  //       (error) => {
  //         console.log('error', error);
  //       }
  //     );
  // }

  getCities() {
    return this.api.getCities();
  }

  getJobsByQuery(query: Query) {
    console.log('query', query);
    this.api
      .getJobsByQuery(query)
      .pipe(
        tap((response: Job[]) => {
          this.jobsStore.remove();
          const newJobsId = response.map((elm) => elm.id);
          this.jobsStore.upsertMany(response); //Actualizando el store
          this.jobsStore.update((state) => {
            return {
              ...state,

              jobsID: newJobsId,
            };
          });
        })
      )
      .subscribe(console.log);
  }

  // getJobsByQuery(query: Query) {
  //   this.api
  //     .getJobsByQuery(query)
  //     .pipe(tap((resp) => console.log('resp', resp)))
  //     .subscribe(console.log);
  // }

  // getJobsByKeyword(term: string) {
  //   this.api
  //     .getJobsByKeyword(term)
  //     .pipe(
  //       tap((response: Job[]) => {
  //         console.log('ree', response);

  //         this.jobsStore.remove();
  //         const newJobsId = response.map((elm) => elm.id);
  //         this.jobsStore.upsertMany(response); //Actualizando el store
  //         const numbersPage = Math.ceil(response.length / 5);
  //         this.jobsStore.update((state) => {
  //           return {
  //             ...state,

  //             jobsID: newJobsId,
  //           };
  //         });
  //       })
  //     )
  //     .subscribe(console.log);
  // }
}
