import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UserDataService } from './services/userData.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  user: string;
  snippets: any[];
  userSubscription: Subscription;

  constructor(private userService: UserDataService) { }

  ngOnInit() {
    this.userSubscription = this.userService.userInfo
      .subscribe(
        (user) => {
          debugger;
          this.user = user;
        }
      );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
