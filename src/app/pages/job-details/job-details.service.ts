import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from 'src/app/models/job.model';
import { JobDetailsApi } from './job-details.api';

@Injectable({
  providedIn: 'root',
})
export class JobDetailsService {
  constructor(private jobDetailsApi: JobDetailsApi) {}

  getJobDetailsService(jobId): Observable<any> {
    return this.jobDetailsApi.getDetailsJob(jobId);
  }
}
