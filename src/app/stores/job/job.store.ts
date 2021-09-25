import { StoreConfig, ID, Store, EntityStore } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { JobState } from './job.state';

export function createInitialState(): JobState {
  return {
    jobsFilteredID: [],
    jobsID: [],
  };
}
@StoreConfig({ name: 'job-page' })
@Injectable({ providedIn: 'root' })
export class JobsStore extends EntityStore<JobState> {
  constructor() {
    super(createInitialState());
  }
}
