import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-sidebar-details',
  templateUrl: './sidebar-details.component.html',
  styleUrls: ['./sidebar-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarDetailsComponent implements OnInit {
  @Input() emailCompany;
  constructor() {}

  ngOnInit(): void {}
}
