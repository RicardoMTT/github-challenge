import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostListener,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HomeService, Query } from '../home.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, OnDestroy {
  cities;
  citiesForm: FormGroup;
  typeForm: FormGroup;
  defaultCities = ['Mohali', 'Amritsar'];
  querySidebar: Query;
  subscriptionWorkType: Subscription = new Subscription();
  subscriptionWorkCity: Subscription = new Subscription();
  querySidebarCity: Query;
  checkboxes = [
    {
      name: 'Part time',
      value: 'Part-time',
    },
    {
      name: 'Full time',
      value: 'Full-Time',
    },
  ];
  constructor(
    private homeService: HomeService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.citiesForm = this.fb.group({
      cities: [''],
    });
    this.typeForm = this.fb.group({
      typeWork: this.fb.array(this.checkboxes.map((x) => false)), //Inicializa el false cada checkbox, osea vacio
    });
    this.initListenerWorkType();
    this.initListener();
  }
  ngOnDestroy(): void {
    this.subscriptionWorkCity.unsubscribe();
    this.subscriptionWorkType.unsubscribe();
  }
  initListenerWorkType() {
    this.typeForm
      .get('typeWork')
      .valueChanges.pipe(tap((val) => this.filterByWorkType(val)))
      .subscribe();
  }
  initListener() {
    this.citiesForm
      .get('cities')
      .valueChanges.pipe(tap((city) => this.filterByCity(city)))
      .subscribe();
  }

  async filterByWorkType(workType) {
    console.log(workType);

    const arrayWorkType = workType;
    this.subscriptionWorkType =
      await this.homeService.sharingQueryObservable.subscribe((val) => {
        this.querySidebar = val;
      });
    if (arrayWorkType[0] === true && arrayWorkType[1] === true) {
      // this.homeService.getApiService();
      this.querySidebar.type = '';
    } else if (arrayWorkType[0] === false && arrayWorkType[1] === false) {
      this.querySidebar.type = '';
    } else if (arrayWorkType[0] === true && arrayWorkType[1] === false) {
      this.querySidebar.type = 'Part-time';
      // this.homeService.getJobsByWorkType('Part-time');
    } else if (arrayWorkType[1] === true) {
      this.querySidebar.type = 'Full-Time';
      // this.homeService.getJobsByWorkType('Full-Time');
    }
    console.log('this.querySidebar', this.querySidebar);

    this.homeService.sharingQueryObservableData = this.querySidebar;
    this.homeService.getJobsByQuery(this.querySidebar);
  }
  async filterByCity(city) {
    this.subscriptionWorkCity =
      await this.homeService.sharingQueryObservable.subscribe((val) => {
        this.querySidebarCity = val;
      });
    if (city == 'todos') {
      this.querySidebarCity.city = '';
    } else {
      this.querySidebarCity.city = this.capitalizeFirstLetter(city);
    }
    this.homeService.sharingQueryObservableData = this.querySidebarCity;
    this.homeService.getJobsByQuery(this.querySidebarCity);

    // this.homeService.getCitiesByInputRadio(city);
  }
  // @HostListener('document:click', ['$event.target'])
  // handleClick($event: HTMLElement): void {
  //   console.log('click', $event.classList.toString());
  //   const className = $event.classList.toString();
  //   if (className === 'form-check-input') {
  //     // full-time o part-time
  //   }
  // }

  ngOnInit(): void {
    this.homeService.getCities().subscribe((cities) => {
      this.cities = cities;
      this.cdr.detectChanges();
    });
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
