import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { JobState } from './job.state';
import { JobsStore } from './job.store';
@Injectable({
  providedIn: 'root',
})
export class JobQuery extends QueryEntity<JobState> {
  constructor(store: JobsStore) {
    super(store);
  }

  jobs$ = this.selectAll();
}
