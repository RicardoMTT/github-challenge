import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HomeService, Query } from '../home.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  querySearch: Query;
  subscription: Subscription = new Subscription();
  constructor(private fb: FormBuilder, private homeService: HomeService) {
    this.searchForm = this.fb.group({
      keyword: ['', [Validators.required]],
    });
  }
  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }

  ngOnInit(): void {}

  async searchJobs() {
    const { keyword } = this.searchForm.value;

    this.subscription = await this.homeService.sharingQueryObservable.subscribe(
      (val) => {
        this.querySearch = val;
      }
    );

    this.querySearch.query = keyword;
    this.homeService.sharingQueryObservableData = this.querySearch;
    // this.homeService.getJobsByKeyword(keyword);
    this.homeService.getJobsByQuery(this.querySearch);
  }
}
