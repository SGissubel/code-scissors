import { Component, OnInit } from '@angular/core';

import { UserDataService } from '../services/userData.sevice';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
  user: {id: number, name: string};
  snippets: any[] = [];

  constructor(private userService: UserDataService) { }

  ngOnInit() {
    this.user = this.userService.getuserData();
    console.log(this.user);
  }

}
