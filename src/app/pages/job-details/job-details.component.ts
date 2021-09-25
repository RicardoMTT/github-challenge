import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Job } from 'src/app/models/job.model';
import { JobDetailsService } from './job-details.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit {
  jobDetails: Job;
  job: Observable<any>;
  constructor(
    private router: ActivatedRoute,
    private jobDetailsService: JobDetailsService
  ) {}

  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id');
    this.job = this.jobDetailsService.getJobDetailsService(id);
  }
}
