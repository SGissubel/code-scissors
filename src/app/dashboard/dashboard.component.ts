import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  user: string;
  snippets: any[];

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
