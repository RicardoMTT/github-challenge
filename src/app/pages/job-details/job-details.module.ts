import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobDetailsRoutingModule } from './job-details-routing.module';
import { JobDetailsComponent } from './job-details.component';
import { SidebarDetailsComponent } from './sidebar-details/sidebar-details.component';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [JobDetailsComponent, SidebarDetailsComponent, DetailComponent],
  imports: [
    CommonModule,
    JobDetailsRoutingModule
  ]
})
export class JobDetailsModule { }
