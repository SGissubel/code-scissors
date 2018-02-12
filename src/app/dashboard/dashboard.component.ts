import { Component, OnInit } from '@angular/core';

import { UserDataService } from './userData.sevice';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: {id: number, name: string};
  snippets: any[];

  constructor(private userService: UserDataService) { }

  ngOnInit() {
    this.userService.setUserId(user);
    // sending id to service here for now - until set up db
  }

}
