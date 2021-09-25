import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { JobQuery } from 'src/app/stores/job/job.query';
import { HomeService, Query } from '../home.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobsComponent implements OnInit {
  p: number = 1;
  constructor(
    public jobQuery: JobQuery,
    private homeService: HomeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const query: Query = {
      city: '',
      query: '',
      type: '',
    };
    this.homeService.getJobsByQuery(query);
  }
  // applyJob(Jobid) {
  //   console.log(Jobid);
  //   // this.router.navigate(['job-details', { id: Jobid }]);
  // }
}
