import { Job } from '../../models/job.model';

import { EntityState, ID } from '@datorama/akita';

export interface JobState extends EntityState<Job> {
  jobsID: ID[];
  jobsFilteredID: ID[];
}
